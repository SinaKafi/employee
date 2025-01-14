type address = {
  id: number;
  address: string;
  company_id: number;
  is_default: number;
  deleted_at: string | Date | null;
  created_at: string | Date;
  updated_at: string | Date;
};
export type IEmployee = {
  id: number;
  name: string;
  family: string;
  email: string;
  mobile: string;
  image: string | null;
  is_active: number;
  code: string;
  address_id: number;
};
export interface IEmployeeList extends IEmployee {}

// single user
type IEmployeeCompany = {
  id: number;
  name: string;
  tel: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  staff: {
    user_id: number;
    company_id: number;
    is_active: number;
    code: string;
    address_id: number;
  };
};

type IEmployeeAddress = {
  id: number;
  address: string;
  company_id: number;
  is_default: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  staff: {
    user_id: number;
    address_id: number;
  };
};
export interface IEmployeeDetail {
  id: number;
  name: string;
  family: string;
  mobile: string;
  email: string;
  image: string | null;
  company_id: number;
  company_name: string;
  address_id: number;
  address: string;
  tel: string;
  code: string;
  is_active: boolean;
}

interface ICurrentUserAddress {
  id: number;
  name: string;
  address: string;
  company_id: number;
  is_default: number;
  lat: string | null;
  long: string | null;
  province: string | null;
  district: string | null;
  city: string | null;
  unit: string | null;
  plaque: string | null;
  postcode: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface currentUser {
  id: number;
  name: string;
  family: string;
  image: string;
  mobile: string;
  code: string;
  company_name: string;
  address_title: string;
  address: string;
  address_id: number;
  company_bonuse: number;
  addresses: ICurrentUserAddress[];
}
