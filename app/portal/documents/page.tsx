"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  createCurrentUserDocument,
  deleteCurrentUserDocument,
  getCurrentUserDocumentSignedUrl,
  getCurrentUserDocuments,
  updateCurrentUserDocument,
  uploadCurrentUserDocument,
} from "@/lib/documents/user-documents";
import { getCurrentUserPlan } from "@/lib/plans/user-plans";
import type {
  UserDocument,
  UserDocumentInput,
  UserDocumentStatus,
} from "@/types/documents";

// Document type as string since DocumentCategory isn't exported
type DocumentCategory = "Medical Records" | "Legal Documents" | "Financial/Planning" | "Travel & Logistics" | "Advisory Materials" | "General";
import type { UserPlanInput } from "@/types/plan";
import { 
  FileText, 
  Shield, 
  Upload, 
  Trash2, 
  Eye, 
  Download, 
  CheckCircle2,
  AlertCircle,
  Clock,
  FolderOpen,
  Stethoscope,
  Scale,
  Plane,
  Briefcase,
  HelpCircle,
  Plus,
  X,
  ChevronRight,
  Lock,
  Archive
} from "lucide-react";

export const runtime = "edge";

// Document categories with premium styling
const DOCUMENT_CATEGORIES: Record<DocumentCategory, { 
  label: string; 
  icon: React.ElementType;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  "Medical Records": {
    label: "Medical Records",
    icon: Stethoscope,
    description: "Clinical summaries, test results, treatment histories",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
  "Legal Documents": {
    label: "Legal Documents",
    icon: Scale,
    description: "Contracts, agreements, legal opinions, powers of attorney",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  "Financial/Planning": {
    label: "Financial & Planning",
    icon: Briefcase,
    description: "Budget worksheets, cost estimates, planning notes",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
  "Travel & Logistics": {
    label: "Travel & Logistics",
    icon: Plane,
    description: "Passports, visas, travel itineraries, accommodation",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  },
  "Advisory Materials": {
    label: "Advisory Materials",
    icon: FolderOpen,
    description: "Strategy notes, consultation records, decision frameworks",
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200"
  },
  "General": {
    label: "General",
    icon: FileText,
    description: "Other supporting documents and records",
    color: "text-stone-700",
    bgColor: "bg-stone-50",
    borderColor: "border-stone-200"
  }
};

// Expected documents by planning stage
const EXPECTED_DOCUMENTS: Record<string, Array<{ name: string; category: DocumentCategory; critical: boolean }>> = {
  foundation: [
    { name: "Initial medical summary", category: "Medical Records", critical: true },
    { name: "Pathway planning notes", category: "Advisory Materials", critical: false }
  ],
  shortlist: [
    { name: "Passport/ID documents", category: "Travel & Logistics", critical: true },
    { name: "Country research notes", category: "Advisory Materials", critical: false },
    { name: "Preliminary budget worksheet", category: "Financial/Planning", critical: false }
  ],
  sequencing: [
    { name: "Detailed medical records", category: "Medical Records", critical: true },
    { name: "Legal requirement checklist", category: "Legal Documents", critical: true },
    { name: "Treatment timeline", category: "Advisory Materials", critical: false }
  ],
  "advisory-active": [
    { name: "Signed advisory agreement", category: "Legal Documents", critical: true },
    { name: "Comprehensive medical history", category: "Medical Records", critical: true },
    { name: "Financial verification documents", category: "Financial/Planning", critical: true },
    { name: "Travel authorization documents", category: "Travel & Logistics", critical: false }
  ],
  completion: [
    { name: "Treatment completion certificate", category: "Medical Records", critical: false },
    { name: "Final legal documentation", category: "Legal Documents", critical: true }
  ]
};

const STATUS_OPTIONS: UserDocumentStatus[] = ["Uploaded", "Pending", "Draft"];

const EMPTY_DOCUMENT_INPUT: UserDocumentInput = {
  file_name: "",
  document_type: "General",
  status: "Pending",
  note: "",
  file_path: null,
  file_size: null,
};

// Utility functions
function formatFileSize(fileSize: number | null): string {
  if (fileSize === null || Number.isNaN(fileSize)) return "Unknown size";
  if (fileSize < 1024) return `${fileSize} B`;
  const kb = fileSize / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.trim().length > 0
  ) {
    return error.message;
  }
  return fallback;
}

// Vault stat card component
function VaultStat({ 
  label, 
  value, 
  subtext, 
  icon: Icon,
  variant = "default"
}: { 
  label: string; 
  value: string | number; 
  subtext: string;
  icon: React.ElementType;
  variant?: "default" | "success" | "warning" | "neutral";
}) {
  const variants = {
    default: "bg-white border-stone-200",
    success: "bg-emerald-50/50 border-emerald-200",
    warning: "bg-amber-50/50 border-amber-200",
    neutral: "bg-stone-50 border-stone-200"
  };

  return (
    <div className={`rounded-2xl border ${variants[variant]} p-6 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-stone-400" />
        <span className="text-[10px] font-bold tracking-[0.15em] text-stone-400 uppercase">{label}</span>
      </div>
      <p className="text-3xl font-semibold text-stone-900">{value}</p>
      <p className="mt-2 text-sm text-stone-500 leading-relaxed">{subtext}</p>
    </div>
  );
}

// Document card component
function DocumentCard({
  document,
  onStatusChange,
  onDelete,
  onView,
  onDownload
}: {
  document: UserDocument;
  onStatusChange: (id: string, status: UserDocumentStatus) => void;
  onDelete: (id: string) => void;
  onView: (path: string | null) => void;
  onDownload: (path: string | null) => void;
}) {
  const category = DOCUMENT_CATEGORIES[document.document_type as DocumentCategory] || DOCUMENT_CATEGORIES["General"];
  const CategoryIcon = category.icon;

  return (
    <article className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl ${category.bgColor} ${category.borderColor} border flex items-center justify-center`}>
              <CategoryIcon className={`w-5 h-5 ${category.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-stone-900 truncate">
                {document.file_name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className={`text-xs font-medium ${category.color}`}>
                  {category.label}
                </span>
                <span className="text-stone-300">•</span>
                <span className={`text-xs font-medium ${
                  document.status === "Uploaded" ? "text-emerald-600" :
                  document.status === "Pending" ? "text-amber-600" : "text-stone-500"
                }`}>
                  {document.status}
                </span>
                {document.file_path && (
                  <>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Secured
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {document.note && (
            <p className="text-sm text-stone-600 leading-relaxed mb-3">
              {document.note}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Added {formatDate(document.created_at)}
            </span>
            {document.file_size && (
              <span className="flex items-center gap-1">
                <Archive className="w-3 h-3" />
                {formatFileSize(document.file_size)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
          {document.file_path ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onView(document.file_path)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 hover:border-stone-300 hover:bg-stone-50 transition"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button
                type="button"
                onClick={() => onDownload(document.file_path)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 hover:border-stone-300 hover:bg-stone-50 transition"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm font-medium text-amber-700">
              <AlertCircle className="w-4 h-4" />
              File pending
            </span>
          )}

          <div className="flex items-center gap-2">
            <select
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-400"
              value={document.status}
              onChange={(e) => onStatusChange(document.id, e.target.value as UserDocumentStatus)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onDelete(document.id)}
              className="p-2 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
              title="Remove document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// Missing documents intelligence component
function MissingDocumentsIntelligence({ 
  documents, 
  planningStage 
}: { 
  documents: UserDocument[]; 
  planningStage: string;
}) {
  const expected = EXPECTED_DOCUMENTS[planningStage] || [];
  const uploadedNames = documents.map(d => d.file_name.toLowerCase());

  const missing = expected.filter(exp => 
    !uploadedNames.some(name => name.includes(exp.name.toLowerCase()))
  );

  const criticalMissing = missing.filter(m => m.critical);
  const recommendedMissing = missing.filter(m => !m.critical);

  if (missing.length === 0) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <HelpCircle className="w-6 h-6 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-stone-900">
            Expected Documents for {planningStage.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Based on your current planning stage, these documents are typically needed:
          </p>

          {criticalMissing.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-bold tracking-wide text-rose-600 uppercase mb-2">Critical</p>
              <div className="flex flex-wrap gap-2">
                {criticalMissing.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {recommendedMissing.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-bold tracking-wide text-stone-500 uppercase mb-2">Recommended</p>
              <div className="flex flex-wrap gap-2">
                {recommendedMissing.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 text-sm">
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Upload zone component
function UploadZone({
  onFileSelect,
  isDragging,
  setIsDragging
}: {
  onFileSelect: (file: File) => void;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
}) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }, [onFileSelect, setIsDragging]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
        isDragging 
          ? "border-emerald-400 bg-emerald-50" 
          : "border-stone-300 bg-stone-50 hover:border-stone-400 hover:bg-stone-100"
      }`}
    >
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-stone-200 flex items-center justify-center mx-auto mb-4">
        <Upload className={`w-8 h-8 ${isDragging ? "text-emerald-500" : "text-stone-400"}`} />
      </div>
      <p className="text-lg font-medium text-stone-900 mb-2">
        {isDragging ? "Drop file to upload" : "Drag & drop files here"}
      </p>
      <p className="text-sm text-stone-500 mb-4">
        Or click to browse from your device
      </p>
      <div className="flex items-center justify-center gap-4 text-xs text-stone-400">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Secure encryption
        </span>
        <span>•</span>
        <span>PDF, JPG, PNG up to 10MB</span>
      </div>
    </div>
  );
}

export default function PortalDocumentsPage() {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [plan, setPlan] = useState<UserPlanInput | null>(null);
  const [form, setForm] = useState<UserDocumentInput>(EMPTY_DOCUMENT_INPUT);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        if (isMounted) setLoading(true);

        const [docs, userPlan] = await Promise.all([
          getCurrentUserDocuments(),
          getCurrentUserPlan()
        ]);

        if (!isMounted) return;

        setDocuments(docs);
        if (userPlan) {
          setPlan({
            pathway_type: userPlan.pathway_type,
            family_structure: userPlan.family_structure,
            treatment_goal: userPlan.treatment_goal,
            donor_needed: userPlan.donor_needed,
            surrogate_needed: userPlan.surrogate_needed,
            priorities: userPlan.priorities ?? [],
            constraints: userPlan.constraints ?? [],
           
            shortlisted_countries: userPlan.shortlisted_countries ?? [],
            timeline_items: userPlan.timeline_items ?? [],
            advisory_status: userPlan.advisory_status ?? null,
            advisory_pathway: userPlan.advisory_pathway ?? null,
            advisory_notes: userPlan.advisory_notes ?? null,
            advisory_next_step: userPlan.advisory_next_step ?? null,
            advisory_stage: userPlan.advisory_stage ?? null,
            target_timeline: userPlan.target_timeline,
            budget_range: userPlan.budget_range,
            notes: userPlan.notes,
          });
        }
      } catch (error: unknown) {
        console.error(error);
        if (isMounted) {
          setIsError(true);
          setMessage(getErrorMessage(error, "Failed to load document vault."));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadData();
    return () => { isMounted = false; };
  }, []);

  const stats = useMemo(() => {
    const uploaded = documents.filter(d => d.status === "Uploaded").length;
    const pending = documents.filter(d => d.status === "Pending").length;
    const draft = documents.filter(d => d.status === "Draft").length;
    const withFiles = documents.filter(d => d.file_path).length;
    return { uploaded, pending, draft, withFiles, total: documents.length };
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    if (selectedCategory === "All") return documents;
    return documents.filter(d => d.document_type === selectedCategory);
  }, [documents, selectedCategory]);

  const documentsByCategory = useMemo(() => {
    const grouped: Record<string, UserDocument[]> = {};
    Object.keys(DOCUMENT_CATEGORIES).forEach(cat => {
      grouped[cat] = documents.filter(d => d.document_type === cat);
    });
    return grouped;
  }, [documents]);

  const planningStage = plan?.advisory_stage || "foundation";

  function updateFormField<K extends keyof UserDocumentInput>(field: K, value: UserDocumentInput[K]) {
    setForm(current => ({ ...current, [field]: value }));
    setMessage(null);
    setIsError(false);
  }

  function handleFileSelect(file: File) {
    setSelectedFile(file);
    setForm(current => ({ ...current, file_name: file.name }));
    setShowUploadPanel(true);
  }

  async function handleCreateDocument() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      if (!selectedFile && form.file_name.trim().length === 0) {
        throw new Error("Document name is required.");
      }

      let finalFileName = form.file_name.trim();
      let finalFilePath: string | null = form.file_path;
      let finalFileSize: number | null = form.file_size;
      let finalStatus: UserDocumentStatus = form.status;

      if (selectedFile) {
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
        document_type: form.document_type.trim() || "General",
        status: finalStatus,
        note: form.note?.trim() || null,
        file_path: finalFilePath,
        file_size: finalFileSize,
      });

      setDocuments(current => [created, ...current]);
      setForm(EMPTY_DOCUMENT_INPUT);
      setSelectedFile(null);
      setShowUploadPanel(false);
      setMessage(selectedFile ? "Document uploaded and secured." : "Document record created.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage(getErrorMessage(error, "Failed to add document."));
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(id: string, status: UserDocumentStatus) {
    try {
      const updated = await updateCurrentUserDocument(id, { status });
      setDocuments(current => current.map(d => d.id === id ? updated : d));
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this document from your vault?")) return;
    try {
      await deleteCurrentUserDocument(id);
      setDocuments(current => current.filter(d => d.id !== id));
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async function handleViewFile(filePath: string | null) {
    if (!filePath) return;
    try {
      const signedUrl = await getCurrentUserDocumentSignedUrl(filePath);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (error: unknown) {
      setIsError(true);
      setMessage(getErrorMessage(error, "Failed to open secure file link."));
    }
  }

  async function handleDownloadFile(filePath: string | null) {
    if (!filePath) return;
    try {
      const signedUrl = await getCurrentUserDocumentSignedUrl(filePath);
      const link = document.createElement("a");
      link.href = signedUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: unknown) {
      setIsError(true);
      setMessage(getErrorMessage(error, "Failed to download file."));
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mr-3"></div>
          <span className="text-stone-600">Loading document vault...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Executive Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">Private Vault</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              Document Vault
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
              Secure storage for medical records, legal documents, financial planning files, and advisory materials. 
              All files are encrypted and accessible only to your authorized advisory team.
            </p>
          </div>
          <Link
            href="/portal"
            className="group inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-stone-400 hover:text-stone-900 hover:bg-stone-50"
          >
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Vault Statistics */}
      <section className="grid gap-4 lg:grid-cols-4">
        <VaultStat
          label="Total Documents"
          value={stats.total}
          subtext="Records in your vault"
          icon={Archive}
          variant="neutral"
        />
        <VaultStat
          label="Uploaded Files"
          value={stats.withFiles}
          subtext="Secured with encryption"
          icon={CheckCircle2}
          variant="success"
        />
        <VaultStat
          label="Pending Upload"
          value={stats.pending}
          subtext="Awaiting file attachment"
          icon={Clock}
          variant="warning"
        />
        <VaultStat
          label="Draft Records"
          value={stats.draft}
          subtext="Planning in progress"
          icon={FileText}
          variant="neutral"
        />
      </section>

      {/* Missing Documents Intelligence */}
      <MissingDocumentsIntelligence 
        documents={documents} 
        planningStage={planningStage}
      />

      {/* Category Filter */}
      <section className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedCategory === "All"
              ? "bg-stone-900 text-white"
              : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
          }`}
        >
          All Documents
        </button>
        {Object.entries(DOCUMENT_CATEGORIES).map(([key, config]) => {
          const Icon = config.icon;
          const count = documentsByCategory[key as DocumentCategory]?.length || 0;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as DocumentCategory)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                selectedCategory === key
                  ? `${config.bgColor} ${config.color} ${config.borderColor} border`
                  : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {config.label}
              {count > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === key ? "bg-white/50" : "bg-stone-100"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </section>

      {/* Upload Section */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">Add to Vault</h2>
            <p className="text-sm text-stone-500">Upload files or create document records</p>
          </div>
          <button
            onClick={() => setShowUploadPanel(!showUploadPanel)}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 transition"
          >
            {showUploadPanel ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showUploadPanel ? "Cancel" : "Add Document"}
          </button>
        </div>

        {!showUploadPanel ? (
          <UploadZone 
            onFileSelect={handleFileSelect}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        ) : (
          <div className="space-y-4">
            {selectedFile && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-900">{selectedFile.name}</p>
                  <p className="text-xs text-emerald-600">{formatFileSize(selectedFile.size)}</p>
                </div>
                <button
                  onClick={() => { setSelectedFile(null); setForm(EMPTY_DOCUMENT_INPUT); }}
                  className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Document Name</label>
                <input
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
                  value={form.file_name}
                  onChange={(e) => updateFormField("file_name", e.target.value)}
                  placeholder="e.g., Medical Summary 2024"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Category</label>
                <select
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
                  value={form.document_type}
                  onChange={(e) => updateFormField("document_type", e.target.value as DocumentCategory)}
                >
                  {Object.entries(DOCUMENT_CATEGORIES).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Status</label>
                <select
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
                  value={form.status}
                  onChange={(e) => updateFormField("status", e.target.value as UserDocumentStatus)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-medium text-stone-700">Notes & Context</label>
                <textarea
                  className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-400 resize-none"
                  rows={3}
                  value={form.note ?? ""}
                  onChange={(e) => updateFormField("note", e.target.value)}
                  placeholder="Add context about this document, its purpose, or any related planning considerations."
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <Shield className="w-4 h-4" />
                <span>Files are encrypted and stored securely</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => { setShowUploadPanel(false); setSelectedFile(null); setForm(EMPTY_DOCUMENT_INPUT); }}
                  className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateDocument}
                  disabled={saving || (!selectedFile && form.file_name.trim().length === 0)}
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      {selectedFile ? "Upload to Vault" : "Save Record"}
                    </>
                  )}
                </button>
              </div>
            </div>

            {message && (
              <p className={`text-sm ${isError ? "text-rose-600" : "text-emerald-600"}`}>
                {message}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Document List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              {selectedCategory === "All" ? "All Documents" : DOCUMENT_CATEGORIES[selectedCategory as DocumentCategory].label}
            </h2>
            <p className="text-sm text-stone-500">
              {filteredDocuments.length} {filteredDocuments.length === 1 ? "record" : "records"} in vault
            </p>
          </div>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-stone-200 flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-lg font-medium text-stone-900 mb-2">
              {selectedCategory === "All" ? "Your vault is empty" : `No ${DOCUMENT_CATEGORIES[selectedCategory as DocumentCategory]?.label || "documents"} yet`}
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto mb-4">
              {selectedCategory === "All" 
                ? "Start building your document vault by uploading medical records, legal documents, and planning materials."
                : `Add ${(DOCUMENT_CATEGORIES[selectedCategory as DocumentCategory]?.label || "documents").toLowerCase()} to organize your planning materials.`}
            </p>
            <button
              onClick={() => setShowUploadPanel(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 transition"
            >
              <Plus className="w-4 h-4" />
              Add First Document
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onView={handleViewFile}
                onDownload={handleDownloadFile}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}