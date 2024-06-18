export interface Schule {
  id: number;
  API_OBJECTID: number;
  API_ID: number;
  TYP: number;
  ART: string;
  STANDORTTYP?: string;
  BEZEICHNUNG?: string;
  BEZEICHNUNGZUSATZ?: string | null; // explicitly allowing null as per API response
  KURZBEZEICHNUNG?: string;
  STRASSE?: string;
  PLZ?: string;
  ORT?: string;
  TELEFON?: string;
  FAX?: string;
  EMAIL?: string;
  PROFILE?: string;
  SPRACHEN?: string | null; // explicitly allowing null as per API response
  WWW?: string;
  TRAEGER?: string;
  TRAEGERTYP?: number;
  BEZUGNR?: string;
  GEBIETSARTNUMMER?: number;
  SNUMMER?: number;
  NUMMER?: number;
  GlobalID?: string;
  CreationDate?: Date;
  Creator?: string;
  EditDate?: Date;
  Editor?: string;
  x: number;
  y: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SchuleApiResponse {
  data: Schule[];
}

export interface Kindertageseinrichtung {
  id: number;
  API_OBJECTID: number;
  API_ID: number;
  TRAEGER?: string;
  BEZEICHNUNG?: string;
  KURZBEZEICHNUNG?: string;
  STRASSE?: string;
  STRSCHL?: string;
  HAUSBEZ?: string;
  PLZ?: string;
  ORT?: string;
  HORT?: number; // 0 or 1 for false or true
  KITA?: number; // 0 or 1 for false or true
  URL?: string;
  TELEFON?: string;
  FAX?: string;
  EMAIL?: string;
  BARRIEREFREI?: number; // 0 or 1 for false or true
  INTEGRATIV?: number; // 0 or 1 for false or true
  x: number;
  y: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface KindertageseinrichtungApiResponse {
  data: Kindertageseinrichtung[];
}

export interface Schulsozialarbeit {
  id: number;
  API_OBJECTID: number;
  API_ID: number;
  TRAEGER: string;
  LEISTUNGEN: string;
  BEZEICHNUNG?: string;
  KURZBEZEICHNUNG?: string;
  STRASSE?: string;
  PLZ: string;
  ORT: string;
  TELEFON?: string;
  EMAIL?: string;
  FAX?: string;
  x: number;
  y: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SchulsozialarbeitApiResponse {
  data: Schulsozialarbeit[];
}

export interface Jugendberufshilfe {
  id: number;
  API_OBJECTID: number;
  API_ID: number;
  TRAEGER: string;
  LEISTUNGEN: string;
  BEZEICHNUNG?: string;
  KURZBEZEICHNUNG?: string;
  STRASSE?: string;
  PLZ: string;
  ORT: string;
  TELEFON?: string;
  EMAIL?: string;
  FAX?: string;
  x: number;
  y: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JugendberufshilfeApiResponse {
  data: Jugendberufshilfe[];
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  addresses: Address[];
}

export interface Address {
  id?: number;
  street: string;
  street2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  userId?: number;
  primaryAddress?: boolean;
  nominatim?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileUpdate {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegistrationResponse {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  addresses: Address[];
  token: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DistanceCalculationData {
  coords1: Coordinates;
  coords2: Coordinates;
}

export type GenericObject = { [key: string]: any };
