export enum RegisterSteps {
  PROFIL = "PROFIL",
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName?: string;
  companySiret?: string;
  companyAddress?: string;
  companyPostalCode?: string;
  companyCity?: string;
}
