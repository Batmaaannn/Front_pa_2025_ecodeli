import { FormPrestationIdWithPrice } from "./prestation";

export enum RegisterSteps {
  PROFIL = "PROFIL",
  PRESTATIONS = "PRESTATIONS",
  INFORMATIONS = "INFORMATIONS",
  DOCUMENTS = "DOCUMENTS",
}

export interface RegisterForm {
  userType: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName?: string;
  companySiret?: string;
  companyAddress?: string;
  companyCity?: string;
  prestations?: FormPrestationIdWithPrice[];
}

export interface AddProfessionnal {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName: string;
  companySiret: string;
  companyAddress: string;
  companyCity: string;
  prestations?: FormPrestationIdWithPrice[];
}

export interface PrescriptionUpload {
  files: File[];
  filename: string;
}
