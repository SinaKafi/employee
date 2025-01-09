export type IAddress = {
  id: number;
  name: string;
  address: string;
  company_id: number;
  is_default: number;
  lat: number | null;
  long: number | null;
  province: string | null;
  district: string | null;
  city: string | null;
  unit: string | null;
  plaque: string | null;
  postcode: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export interface IAddAddressProp {
  name: string;
  address: string;
  city: string;
  province: string;
  plaque: string;
  unit: string;
  lat: string;
  long: string;
  district: string;
  postcode: string;
  id?: string;
}
interface IEditAddress extends IAddAddressProp {
  id: string;
}
