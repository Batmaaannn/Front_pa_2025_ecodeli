import { Statut } from "./statut";

export interface FormUpdateFileStatutRegistration {
  id: number;
  status: Statut;
  validityDate: Date | null;
}
