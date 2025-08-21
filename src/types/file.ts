import { Status } from "./status";
import { User } from "./user";

export interface FormUpdateFileStatus {
  id: number;
  status: Status;
  validityDate: Date | null;
  type: DocumentType;
}

export enum FileTargetType {
  USER = "user",
  MERCHANT = "merchant",
  CUSTOMER = "customer",
  SERVICE_AGENT = "service_agent",
  DELIVERY_AGENT = "delivery_agent",
}

export enum DocumentType {
  INVOICE = "invoice",
  CONTRACT = "contract",
  DELIVERY_PROOF = "delivery_proof",
  IDENTITY = "identity",
  LICENSE = "license",
  INSURANCE = "insurance",
  CERTIFICATE = "certificate",
}

export interface File {
  id: number;
  target_type: FileTargetType;
  target_id: number;
  approval_date?: Date;
  status: Status;
  file_url: string;
  file_name: string;
  validity?: Date;
  info?: string;
  document_type?: DocumentType;
  user?: User;
  user_id?: number;
}
