export interface Prestation {
  id: number;
  label: string;
  category: string;
  ecodeli_price: number;
  pricing_unit: string;
  description: string;
}

export interface FormPrestationIdWithPrice {
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

export interface PrestationWithPrice {
  id: number;
  price: string;
  prestation: Prestation & {
    created_at: string;
    updated_at: string;
  };
}
