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

const DOCUMENT_CATEGORIES = [
  "Identity",
  "Medical Records",
  "Fertility Testing",
  "Clinic Communications",
  "Legal",
  "Financial & Insurance",
  "Travel & Visas",
  "Advisory",
  "Personal Planning",
  "General",
] as const;

type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number];

const STATUS_OPTIONS: UserDocumentStatus[] = ["Uploaded", "Pending", "Draft"];

const EMPTY_DOCUMENT_INPUT: UserDocumentInput = {
  file_name: "",
  document_type: "General",
  status: "Pending",
  note: "",
  file_path: null,
  file_size: null,
};

function formatFileSize(fileSize: number | null): string {
  if (fileSize === null || Number.isNaN(fileSize)) {
    return "Unknown size";
  }

  if (fileSize < 1024) {
    return `${fileSize} B`;
  }

  const kilobytes = fileSize / 1024;

  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`;
  }

  return `${(kilobytes / 1024).toFixed(1)} MB`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString();
}

function normalizeCategory(value: string): DocumentCategory {
  return DOCUMENT_CATEGORIES.includes(value as DocumentCategory)
    ? (value as DocumentCategory)
    : "General";
}

export default function PortalDocumentsPage() {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [form, setForm] = useState<UserDocumentInput>(EMPTY_DOCUMENT_INPUT);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserDocumentStatus | "All">(
    "All"
  );
  const [categoryFilter, setCategoryFilter] = useState<
    DocumentCategory | "All"
  >("All");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyDocumentId, setBusyDocumentId] = useState<string | null>(null);
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
      } catch (error: unknown) {
        console.error(error);

        if (isMounted) {
          setDocuments([]);
          setIsError(true);
          setMessage(
            error instanceof Error
              ? error.message
              : "Failed to load your documents."
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
    () => documents.filter((document) => document.status === "Uploaded").length,
    [documents]
  );

  const pendingCount = useMemo(
    () => documents.filter((document) => document.status === "Pending").length,
    [documents]
  );

  const draftCount = useMemo(
    () => documents.filter((document) => document.status === "Draft").length,
    [documents]
  );

  const categoryCounts = useMemo(
    () =>
      DOCUMENT_CATEGORIES.map((category) => ({
        category,
        count: documents.filter(
          (document) => normalizeCategory(document.document_type) === category
        ).length,
      })),
    [documents]
  );

  const activeCategoryCount = categoryCounts.filter(
    (item) => item.count > 0
  ).length;

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        document.file_name.toLowerCase().includes(normalizedQuery) ||
        document.document_type.toLowerCase().includes(normalizedQuery) ||
        (document.note ?? "").toLowerCase().includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "All" || document.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        normalizeCategory(document.document_type) === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [categoryFilter, documents, searchQuery, statusFilter]);

  function updateFormField<K extends keyof UserDocumentInput>(
    field: K,
    value: UserDocumentInput[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setMessage(null);
    setIsError(false);
  }

  function clearForm() {
    setForm(EMPTY_DOCUMENT_INPUT);
    setSelectedFile(null);
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
      let finalFilePath = form.file_path;
      let finalFileSize = form.file_size;
      let finalStatus = form.status;

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
        document_type: normalizeCategory(form.document_type),
        status: finalStatus,
        note: form.note?.trim() ? form.note.trim() : null,
        file_path: finalFilePath,
        file_size: finalFileSize,
      });

      setDocuments((current) => [created, ...current]);
      setForm(EMPTY_DOCUMENT_INPUT);
      setSelectedFile(null);
      setMessage(
        selectedFile !== null
          ? "Document uploaded successfully."
          : "Document entry added successfully."
      );
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

  async function handleStatusChange(
    id: string,
    status: UserDocumentStatus
  ) {
    try {
      setBusyDocumentId(id);
      setMessage(null);
      setIsError(false);

      const updated = await updateCurrentUserDocument(id, { status });

      setDocuments((current) =>
        current.map((document) => (document.id === id ? updated : document))
      );
      setMessage("Document updated successfully.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to update document.");
    } finally {
      setBusyDocumentId(null);
    }
  }

  async function handleDelete(document: UserDocument) {
    const shouldDelete = window.confirm(
      `Remove "${document.file_name}" from your document vault?`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setBusyDocumentId(document.id);
      setMessage(null);
      setIsError(false);

      await deleteCurrentUserDocument(document.id);

      setDocuments((current) =>
        current.filter((item) => item.id !== document.id)
      );
      setMessage("Document removed successfully.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to remove document.");
    } finally {
      setBusyDocumentId(null);
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
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
        Loading your document vault...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Documents
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Document Vault
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Organize the records, notes, and supporting files needed for fertility
          planning, advisory preparation, clinic review, and cross-border
          treatment logistics.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Uploaded",
            value: uploadedCount,
            body: "Secure files already stored in your private vault.",
          },
          {
            label: "Pending",
            value: pendingCount,
            body: "Documents still waiting to be collected or uploaded.",
          },
          {
            label: "Draft Notes",
            value: draftCount,
            body: "Planning records saved before a final file is available.",
          },
          {
            label: "Active Categories",
            value: activeCategoryCount,
            body: "Planning categories currently represented in your vault.",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-stone-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-stone-900">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {stat.body}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
              Vault Coverage
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              Planning Categories
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
              Use consistent categories so important medical, legal, travel,
              financial, and clinic records remain easy to locate.
            </p>
          </div>
          <p className="text-sm text-stone-600">
            {activeCategoryCount} of {DOCUMENT_CATEGORIES.length} categories in
            use
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categoryCounts.map((item) => (
            <button
              key={item.category}
              type="button"
              onClick={() =>
                setCategoryFilter((current) =>
                  current === item.category ? "All" : item.category
                )
              }
              className={`rounded-xl border p-4 text-left transition ${
                categoryFilter === item.category
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-200 bg-stone-50 text-stone-900 hover:border-stone-300"
              }`}
            >
              <p className="text-sm font-semibold">{item.category}</p>
              <p
                className={`mt-2 text-xs ${
                  categoryFilter === item.category
                    ? "text-stone-200"
                    : "text-stone-500"
                }`}
              >
                {item.count} {item.count === 1 ? "document" : "documents"}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Add Document Entry
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Upload a file now or create a structured record for something you
            still need to collect.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label
              htmlFor="document-file"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              File Upload
            </label>
            <input
              id="document-file"
              type="file"
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;

                setSelectedFile(file);
                setMessage(null);
                setIsError(false);

                if (file !== null) {
                  setForm((current) => ({
                    ...current,
                    file_name: file.name,
                  }));
                }
              }}
            />
            <p className="mt-2 text-xs text-stone-500">
              Allowed file types: PDF, JPG, PNG, and WEBP.
            </p>
          </div>

          <div>
            <label
              htmlFor="document-name"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Document Name
            </label>
            <input
              id="document-name"
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={form.file_name}
              onChange={(event) =>
                updateFormField("file_name", event.target.value)
              }
              placeholder="Passport copy or fertility test results"
            />
          </div>

          <div>
            <label
              htmlFor="document-category"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Category
            </label>
            <select
              id="document-category"
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={normalizeCategory(form.document_type)}
              onChange={(event) =>
                updateFormField("document_type", event.target.value)
              }
            >
              {DOCUMENT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="document-status"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Status
            </label>
            <select
              id="document-status"
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={form.status}
              onChange={(event) =>
                updateFormField(
                  "status",
                  event.target.value as UserDocumentStatus
                )
              }
              disabled={selectedFile !== null}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {selectedFile !== null ? (
              <p className="mt-2 text-xs text-stone-500">
                Uploaded files are automatically marked as Uploaded.
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <label
              htmlFor="document-note"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Note
            </label>
            <textarea
              id="document-note"
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              rows={4}
              value={form.note ?? ""}
              onChange={(event) =>
                updateFormField("note", event.target.value)
              }
              placeholder="Add planning context, why this document matters, or what is still needed."
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
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

          <button
            type="button"
            onClick={clearForm}
            disabled={saving}
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Clear
          </button>

          {message ? (
            <p
              role={isError ? "alert" : "status"}
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              Current Document List
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Search, filter, review, and maintain the records in your private
              vault.
            </p>
          </div>

          <p className="text-sm text-stone-600">
            Showing {filteredDocuments.length} of {documents.length}
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-3">
          <div>
            <label
              htmlFor="document-search"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Search
            </label>
            <input
              id="document-search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              placeholder="Search name, category, or note"
            />
          </div>

          <div>
            <label
              htmlFor="document-status-filter"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Status
            </label>
            <select
              id="document-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as UserDocumentStatus | "All"
                )
              }
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
            >
              <option value="All">All statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="document-category-filter"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Category
            </label>
            <select
              id="document-category-filter"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value as DocumentCategory | "All"
                )
              }
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
            >
              <option value="All">All categories</option>
              {DOCUMENT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-600">
            {documents.length === 0
              ? "No document entries yet. Add your first record above."
              : "No documents match the current search or filters."}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDocuments.map((document) => {
              const isBusy = busyDocumentId === document.id;

              return (
                <article
                  key={document.id}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="break-words text-lg font-semibold text-stone-900">
                          {document.file_name}
                        </h3>
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                          {document.document_type}
                        </span>
                        <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                          {document.status}
                        </span>
                        <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                          {document.file_path
                            ? "Uploaded file"
                            : "Metadata only"}
                        </span>
                      </div>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                        {document.note ?? "No note added yet."}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-stone-500">
                        <span>Added: {formatDate(document.created_at)}</span>
                        <span>Updated: {formatDate(document.updated_at)}</span>
                        <span>Size: {formatFileSize(document.file_size)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {document.file_path ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              handleViewFile(document.file_path)
                            }
                            disabled={isBusy}
                            className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            View File
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDownloadFile(document.file_path)
                            }
                            disabled={isBusy}
                            className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Download
                          </button>
                        </>
                      ) : null}

                      <select
                        aria-label={`Status for ${document.file_name}`}
                        className="rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
                        value={document.status}
                        disabled={isBusy}
                        onChange={(event) =>
                          void handleStatusChange(
                            document.id,
                            event.target.value as UserDocumentStatus
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
                        onClick={() => void handleDelete(document)}
                        disabled={isBusy}
                        className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isBusy ? "Working..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
