export interface Prestation {
  id: number;
  label: string;
  category: string;
}

export interface PrestationIdWithPrice {
  prestationId: number;
  price: number;
}

export interface InformationsForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
  siret: string;
  companyCity: string;
  compagnyPostalCode: string;
  companyAddress: string;
}
