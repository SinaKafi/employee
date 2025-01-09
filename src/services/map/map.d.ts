interface Geom {
  type: "Point";
  coordinates: [string, string]; // Using strings because the coordinates are provided as strings
}

export interface AddressData {
  address: string;
  postal_address: string;
  address_compact: string;
  primary: string;
  name: string;
  poi: string;
  penult: string | null;
  country: string;
  province: string;
  county: string;
  district: string;
  rural_district: string;
  city: string;
  village: string;
  region: string;
  neighbourhood: string;
  last: string;
  plaque: string;
  postal_code: string;
  geom: Geom;
}
// map search

export interface IGeoJSONPoint {
  type: "Point";
  coordinates: [number, number];
}

interface Location {
  province: string;
  county: string;
  district: string;
  city: string;
  region: string;
  neighborhood: string;
  title: string;
  address: string;
  type: "point" | "polygon";
  fclass: string;
  geom: IGeoJSONPoint;
}

export interface ILocationData {
  "odata.count": number;
  value: Location[];
}
