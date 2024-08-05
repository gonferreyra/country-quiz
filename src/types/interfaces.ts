// Api Response Interface
export interface Country {
  altSpellings: string[];
  area: number;
  borders?: string[];
  capital?: string[];
  capitalInfo: CapitalInfo;
  car: Car;
  cca2: string;
  cca3: string;
  ccn3?: string;
  cioc?: string;
  coatOfArms: CoatOfArms;
  continents: Continent[];
  currencies?: { [key: string]: Currency };
  demonyms?: Demonyms;
  fifa?: string;
  flag: string;
  flags: Flags;
  gini?: { [key: string]: number };
  idd: Idd;
  independent?: boolean;
  landlocked: boolean;
  languages?: { [key: string]: string };
  latlng: number[];
  maps: Maps;
  name: Name;
  population: number;
  postalCode?: PostalCode;
  region: Region;
  startOfWeek: StartOfWeek;
  status: Status;
  subregion?: string;
  timezones: string[];
  tld?: string[];
  translations: { [key: string]: Translation };
  unMember: boolean;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  side: Side;
  signs?: string[];
}

export enum Side {
  Left = 'left',
  Right = 'right',
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export enum Continent {
  Africa = 'Africa',
  Antarctica = 'Antarctica',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SouthAmerica = 'South America',
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  alt?: string;
  png: string;
  svg: string;
}

export interface Idd {
  root?: string;
  suffixes?: string[];
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  nativeName?: { [key: string]: Translation };
  official: string;
}

export interface Translation {
  common: string;
  official: string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export enum StartOfWeek {
  Monday = 'monday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export enum Status {
  OfficiallyAssigned = 'officially-assigned',
  UserAssigned = 'user-assigned',
}
