export type UserDocumentStatus = "Uploaded" | "Pending" | "Draft";

export type UserDocument = {
  id: string;
  user_id: string;
  file_name: string;
  document_type: string;
  status: UserDocumentStatus;
  note: string | null;
  file_path: string | null;
  file_size: number | null;
  created_at: string;
  updated_at: string;
};

export type UserDocumentInput = {
  file_name: string;
  document_type: string;
  status: UserDocumentStatus;
  note: string | null;
  file_path: string | null;
  file_size: number | null;
};