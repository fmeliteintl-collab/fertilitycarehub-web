import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { UserDocument, UserDocumentStatus } from "@/types/documents";

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

export async function getCurrentUserDocumentsServer(): Promise<UserDocument[]> {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

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