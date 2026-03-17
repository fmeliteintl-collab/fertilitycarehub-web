import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type {
  UserDocument,
  UserDocumentInput,
  UserDocumentStatus,
} from "@/types/documents";

function normalizeDocumentStatus(value: unknown): UserDocumentStatus {
  if (value === "Uploaded" || value === "Pending" || value === "Draft") {
    return value;
  }

  return "Pending";
}

function normalizeUserDocument(row: UserDocument): UserDocument {
  return {
    ...row,
    status: normalizeDocumentStatus(row.status),
    note: typeof row.note === "string" ? row.note : null,
    file_path: typeof row.file_path === "string" ? row.file_path : null,
    file_size: typeof row.file_size === "number" ? row.file_size : null,
  };
}

function isMissingSessionError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === "AuthSessionMissingError" ||
      error.message.toLowerCase().includes("auth session missing"))
  );
}

async function getAuthenticatedUser() {
  const supabase = getSupabaseBrowserClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      if (isMissingSessionError(error)) {
        return { supabase, user: null };
      }

      throw error;
    }

    return { supabase, user: user ?? null };
  } catch (error) {
    if (isMissingSessionError(error)) {
      return { supabase, user: null };
    }

    throw error;
  }
}

export async function getCurrentUserDocuments(): Promise<UserDocument[]> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("user_documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return Array.isArray(data)
    ? data.map((row) => normalizeUserDocument(row as UserDocument))
    : [];
}

export async function createCurrentUserDocument(
  input: UserDocumentInput
): Promise<UserDocument> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const payload = {
    user_id: user.id,
    file_name: input.file_name,
    document_type: input.document_type,
    status: input.status,
    note: input.note,
    file_path: input.file_path,
    file_size: input.file_size,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("user_documents")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return normalizeUserDocument(data as UserDocument);
}

export async function updateCurrentUserDocument(
  id: string,
  input: Partial<UserDocumentInput>
): Promise<UserDocument> {
  const supabase = getSupabaseBrowserClient();

  const payload = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("user_documents")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return normalizeUserDocument(data as UserDocument);
}

export async function deleteCurrentUserDocument(id: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  const { error } = await supabase.from("user_documents").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function uploadCurrentUserDocument(file: File): Promise<{
  filePath: string;
  fileSize: number;
  fileName: string;
}> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const sanitizedFileName = file.name.replace(/\s+/g, "-");
  const filePath = `${user.id}/${Date.now()}-${sanitizedFileName}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(filePath, file, {
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  return {
    filePath,
    fileSize: file.size,
    fileName: file.name,
  };
}

export async function getCurrentUserDocumentSignedUrl(
  filePath: string
): Promise<string> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(filePath, 60 * 10);

  if (error) {
    throw error;
  }

  if (!data?.signedUrl) {
    throw new Error("Failed to generate secure file link.");
  }

  return data.signedUrl;
}