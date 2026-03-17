"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createCurrentUserDocument,
  deleteCurrentUserDocument,
  getCurrentUserDocumentSignedUrl,
  getCurrentUserDocuments,
  updateCurrentUserDocument,
  uploadCurrentUserDocument,
} from "@/lib/documents/user-documents";
import type {
  UserDocument,
  UserDocumentInput,
  UserDocumentStatus,
} from "@/types/documents";

export const runtime = "edge";

const EMPTY_DOCUMENT_INPUT: UserDocumentInput = {
  file_name: "",
  document_type: "General",
  status: "Pending",
  note: "",
  file_path: null,
  file_size: null,
};

const STATUS_OPTIONS: UserDocumentStatus[] = ["Uploaded", "Pending", "Draft"];

function formatFileSize(fileSize: number | null): string {
  if (fileSize === null || Number.isNaN(fileSize)) {
    return "Unknown size";
  }

  if (fileSize < 1024) {
    return `${fileSize} B`;
  }

  const kb = fileSize / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString();
}

export default function PortalDocumentsPage() {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [form, setForm] = useState<UserDocumentInput>(EMPTY_DOCUMENT_INPUT);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDocuments() {
      try {
        if (isMounted) {
          setLoading(true);
          setMessage(null);
          setIsError(false);
        }

        const rows = await getCurrentUserDocuments();

        if (!isMounted) {
          return;
        }

        setDocuments(rows);
        setMessage(null);
        setIsError(false);
      } catch (error: unknown) {
  console.error(error);

  if (isMounted) {
    setDocuments([]);
    setIsError(true);
    setMessage(
      error instanceof Error ? error.message : "Failed to load your documents."
    );
  }
} finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadDocuments();

    return () => {
      isMounted = false;
    };
  }, []);

  const uploadedCount = useMemo(
    () => documents.filter((doc) => doc.status === "Uploaded").length,
    [documents]
  );

  const pendingCount = useMemo(
    () => documents.filter((doc) => doc.status === "Pending").length,
    [documents]
  );

  const draftCount = useMemo(
    () => documents.filter((doc) => doc.status === "Draft").length,
    [documents]
  );

  function updateFormField<K extends keyof UserDocumentInput>(
    field: K,
    value: UserDocumentInput[K]
  ) {
    setForm((current: UserDocumentInput) => ({
      ...current,
      [field]: value,
    }));

    setMessage(null);
    setIsError(false);
  }

  async function handleCreateDocument() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      if (selectedFile === null && form.file_name.trim().length === 0) {
        throw new Error("Document name is required.");
      }

      let finalFileName = form.file_name.trim();
      let finalFilePath: string | null = form.file_path;
      let finalFileSize: number | null = form.file_size;
      let finalStatus: UserDocumentStatus = form.status;

      if (selectedFile !== null) {
        const uploadResult = await uploadCurrentUserDocument(selectedFile);

        finalFileName = uploadResult.fileName;
        finalFilePath = uploadResult.filePath;
        finalFileSize = uploadResult.fileSize;
        finalStatus = "Uploaded";
      }

      if (finalFileName.length === 0) {
        throw new Error("Document name is required.");
      }

      const created = await createCurrentUserDocument({
        file_name: finalFileName,
        document_type:
          form.document_type.trim().length > 0
            ? form.document_type.trim()
            : "General",
        status: finalStatus,
        note: form.note?.trim() ? form.note.trim() : null,
        file_path: finalFilePath,
        file_size: finalFileSize,
      });

      setDocuments((current: UserDocument[]) => [created, ...current]);
      setForm(EMPTY_DOCUMENT_INPUT);
      setSelectedFile(null);
      setMessage(
        selectedFile !== null
          ? "Document uploaded successfully."
          : "Document entry added successfully."
      );
      setIsError(false);
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Failed to add document."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(id: string, status: UserDocumentStatus) {
    try {
      setMessage(null);
      setIsError(false);

      const updated = await updateCurrentUserDocument(id, { status });

      setDocuments((current: UserDocument[]) =>
        current.map((doc) => (doc.id === id ? updated : doc))
      );

      setMessage("Document updated successfully.");
      setIsError(false);
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to update document.");
    }
  }

  async function handleDelete(id: string) {
    try {
      setMessage(null);
      setIsError(false);

      await deleteCurrentUserDocument(id);

      setDocuments((current: UserDocument[]) =>
        current.filter((doc) => doc.id !== id)
      );
      setMessage("Document removed successfully.");
      setIsError(false);
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to remove document.");
    }
  }

  async function handleViewFile(filePath: string | null) {
    try {
      setMessage(null);
      setIsError(false);

      if (!filePath) {
        throw new Error("This document does not have an uploaded file yet.");
      }

      const signedUrl = await getCurrentUserDocumentSignedUrl(filePath);

      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to open the secure file link."
      );
    }
  }

  async function handleDownloadFile(filePath: string | null) {
    try {
      setMessage(null);
      setIsError(false);

      if (!filePath) {
        throw new Error("No file available for download.");
      }

      const signedUrl = await getCurrentUserDocumentSignedUrl(filePath);

      const link = document.createElement("a");
      link.href = signedUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to download the file."
      );
    }
  }

  if (loading) {
    return <div className="p-6">Loading your document vault...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Documents
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Document Vault
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Organize the records, notes, and supporting files needed for fertility
          planning, advisory preparation, and cross-border treatment logistics.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Uploaded</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {uploadedCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Documents already marked as uploaded in your private vault.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Pending</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {pendingCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Supporting documents still pending collection or upload.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Draft Notes</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {draftCount}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Advisory-related or planning-related draft document entries.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
         <h2 className="text-xl font-semibold text-stone-900">
  Add Document Entry DOC-TEST
</h2>
          <p className="mt-1 text-sm text-stone-600">
            You can either upload a real file now or create a structured document
            record first.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium text-stone-700">
              File Upload
            </label>
            <input
              type="file"
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setSelectedFile(file);
                setMessage(null);
                setIsError(false);

                if (file !== null) {
                  setForm((current: UserDocumentInput) => ({
                    ...current,
                    file_name: file.name,
                  }));
                }
              }}
            />
            <p className="mt-2 text-xs text-stone-500">
              Allowed: PDF, JPG, PNG, WEBP
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Document Name
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={form.file_name}
              onChange={(e) => updateFormField("file_name", e.target.value)}
              placeholder="Passport Copy / Medical Summary / Consultation Notes"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Document Type
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={form.document_type}
              onChange={(e) => updateFormField("document_type", e.target.value)}
              placeholder="Identity / Medical / Advisory / Legal"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Status
            </label>
            <select
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={form.status}
              onChange={(e) =>
                updateFormField("status", e.target.value as UserDocumentStatus)
              }
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Note
            </label>
            <textarea
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              rows={4}
              value={form.note ?? ""}
              onChange={(e) => updateFormField("note", e.target.value)}
              placeholder="Add planning context, what this document is for, or what is still needed."
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleCreateDocument}
            disabled={saving}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : selectedFile !== null
                ? "Upload Document"
                : "Add Document"}
          </button>

          {message ? (
            <p
              className={`text-sm ${
                isError ? "text-red-600" : "text-green-700"
              }`}
            >
              {message}
            </p>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Current Document List
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            These entries are now saved to your private document vault.
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-600">
            No document entries yet. Add your first record above.
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((document) => (
              <article
                key={document.id}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-stone-900">
                        {document.file_name}
                      </h3>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                        {document.document_type}
                      </span>
                      <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                        {document.status}
                      </span>
                      <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                        {document.file_path ? "Uploaded file" : "Metadata only"}
                      </span>
                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                      {document.note ?? "No note added yet."}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-stone-500">
                      <span>Added: {formatDate(document.created_at)}</span>
                      <span>Size: {formatFileSize(document.file_size)}</span>
                    </div>

                    {document.file_path ? (
                      <p className="mt-2 text-xs text-stone-500">
                        Stored securely in document vault.
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {document.file_path ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleViewFile(document.file_path)}
                          className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                        >
                          View File
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadFile(document.file_path)}
                          className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                        >
                          Download
                        </button>
                      </>
                    ) : null}

                    <select
                      className="rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-700"
                      value={document.status}
                      onChange={(e) =>
                        handleStatusChange(
                          document.id,
                          e.target.value as UserDocumentStatus
                        )
                      }
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDelete(document.id)}
                      className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}