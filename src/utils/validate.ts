export function validateSiret(value: string): string {
  if (value.length === 0) return "Le champ 'Siret' est requis";
  else if (value.length !== 14)
    return "La valeur du champ 'Siret' doit être égale à 14 caractères";
  return "";
}

export function validateCompanyName(value: string): string {
  if (!value) return "Le champ 'Nom de l'entreprise' est requis";
  else if (value.length < 2 || value.length > 30)
    return "La valeur du champ 'Nom de l'entreprise' doit être comprise entre 2 et 30 caractères";
  return "";
}

export function validateFirstName(value: string): string {
  if (!value) return "Le champ 'Prénom' est requis";
  if (value.length > 30 || value.length < 2)
    return "La valeur du champ 'Prénom' doit être comprise entre 2 et 30 caractères";
  return "";
}
export function validateLastName(value: string): string {
  if (!value) return "Le champ 'Nom de famille' est requis";
  if (value.length > 30 || value.length < 2)
    return "La valeur du champ 'Nom de famille' doit être comprise entre 2 et 30 caractères";
  return "";
}

export function validateEmail(value: string): string {
  if (!value) return "Le champ 'Email' est requis";
  if (!value.includes(".") || !value.includes("@")) return "E-mail invalide";
  return "";
}

export function validatePhoneNumber(value: string): string {
  if (!value) return "Le champ 'N° de téléphone' est requis";
  if (value.length != 10)
    return "La valeur du champ 'N° de téléphone' doit comprendre 10 caractères";
  return "";
}

export function validateAddress(value: string): string {
  if (!value) return "Le champ 'Adresse' est requis";
  if (value.length > 50 || value.length < 2) return "";
  return "";
}

export function validatePassword(password: string): string {
  if (password.length === 0) return "Le mot de passe est requis";
  return "";
}

export function validatePasswordConfirmation(
  confirmPassword: string,
  password: string
): string {
  if (confirmPassword.length === 0)
    return "Le champ Confirmation du mot de passe est requis";
  else if (confirmPassword !== password)
    return "Les mots de passe ne correspondent pas";
  return "";
}

export function validateObjectEmail(value: string): string {
  if (value.length === 0) return "Le champ 'Objet' est requis";
  return "";
}

export function validateContent(value: string): string {
  if (value.length === 0) return "Le champ 'Message' est requis";
  return "";
}

export function validateCGU(value: boolean): string {
  if (!value) return "Merci d'accepter les conditions d'utilisation";
  return "";
}

export function mail(value: string | null): string | null {
  if (!value) {
    return "Veuillez entrer votre adresse email";
  }

  if (!value.includes(".") || !value.includes("@")) {
    return "E-mail invalide";
  }

  return null;
}
