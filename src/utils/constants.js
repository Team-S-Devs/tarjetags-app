export const GREY_RECTANGLE =
  "https://i.ibb.co/Np6gfbd/light-grey-background-institute-of-innovation-technology-and-light-grey-background-png-4095-1982.png";
export const MAIN_COLOR = "#561AD9";

export const URL_NAME = "tarjetag.com/"

export const LICENSE_TYPES = {
  FREE: "Gratis",
  STANDARD: "Estándar",
  PROFESSIONAL: "Profesional",
  GOLD: "Oro",
  SILVER: "Plata",
  BRONZE: "Bronce",
};

export const licenseLimits = {
  [LICENSE_TYPES.FREE]: {
    maxProducts: 10,
    admin: false,
    excludedButtons: ["WhatsApp", "Google Maps"],
    productsDivision: false
  },
  [LICENSE_TYPES.STANDARD]: {
    maxProducts: 100,
    admin: false,
    excludedButtons: [],
    productsDivision: false
  },
  [LICENSE_TYPES.PROFESSIONAL]: {
    maxProducts: 250,
    admin: true,
    excludedButtons: [],
    productsDivision: true
  },
  [LICENSE_TYPES.GOLD]: {
    maxProducts: 250,
    admin: true,
    excludedButtons: [],
    productsDivision: true
  },
  [LICENSE_TYPES.SILVER]: {
    maxProducts: 250,
    admin: true,
    excludedButtons: [],
    productsDivision: true
  },
  [LICENSE_TYPES.BRONZE]: {
    maxProducts: 250,
    admin: true,
    excludedButtons: [],
    productsDivision: true
  },
}