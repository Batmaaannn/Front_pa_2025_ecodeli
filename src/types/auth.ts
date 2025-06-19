export enum RegisterSteps {
  PROFIL = "PROFIL",
  INFORMATIONS = "INFORMATIONS",
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
}
