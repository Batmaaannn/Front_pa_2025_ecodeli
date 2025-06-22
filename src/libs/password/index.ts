import { passwordStrength, type Result } from "check-password-strength";

export const passwordStrengthCheck = (password: string) => {
  const allowedSymbols = "!\"#$%&'()*+,-./:;<=>?@[\\\\\\]^_`{|}~";
  const result = passwordStrength(password.trim(), undefined, allowedSymbols);

  const missingElements = getMissingElements(result);
  const strength = getStrengthValue(result);
  const color = getStrengthColor(result);
  const length = result.length;
  const errorsArray = [];

  const lengthError =
    length < 10 ? "Le mot de passe doit faire au moins 10 caractères" : "";
  const missingElementsError =
    missingElements.length > 0
      ? `Votre mot de passe doit aussi contenir au moins un caractère de ces types : ${missingElements.join(
          ", "
        )}`
      : "";

  if (lengthError) errorsArray.push(lengthError);
  if (missingElementsError) errorsArray.push(missingElementsError);

  return {
    color,
    strength,
    missingElementsError,
    lengthError,
    errors: errorsArray,
  };
};

export const getMissingElements = (result: Result<string>): string[] => {
  const types = ["lowercase", "uppercase", "number", "symbol"];

  return types
    .filter((type) => !result.contains.find((element) => element === type))
    .map((item: string) => {
      switch (item) {
        case "uppercase":
          return "majuscule";
        case "lowercase":
          return "minuscule";
        case "number":
          return "chiffre";
        case "symbol":
          return "caractère spécial";
        default:
          return "";
      }
    })
    .filter((item: string) => !!item);
};

export const getStrengthValue = (result: Result<string>): string => {
  const { id } = result;
  if (id === 0) return "Trop faible";
  if (id === 1) return "Faible";
  if (id === 2) return "Moyen";
  if (id === 3) return "Fort";
  return "";
};

export const getStrengthColor = (result: Result<string>): string => {
  const { id } = result;
  if (id === 0) return "red";
  if (id === 1) return "orange";
  if (id === 2) return "blue";
  if (id === 3) return "green";
  return "";
};
