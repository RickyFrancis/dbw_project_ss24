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
