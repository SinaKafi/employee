interface OrderDetail {
  food_id: number;
  quantity: number;
}

export interface IOrder {
  date: string;
  address_id: number;
  details: OrderDetail[];
}
///
export interface IOrderDataPerMonth {
  id: number;
  user_id: number;
  company_id: number;
  address_id: number;
  order_date: string;
  order_amount: number;
  company_bonuse: number;
  employee_amount: number;
  count: number;
  is_delivered: number;
  created_at: string;
  updated_at: string;
}
////// get order by date in menu page
interface OrderDetailInMenu {
  id: number;
  order_id: number;
  food_id: number;
  price: number;
  quantity: number;
  is_delivered: number;
  created_at: string;
  updated_at: string;
  category_id: number;
  food: string;
  image: string;
  ingredient: string;
  deleted_at: string | null;
}

export interface IOrderDataPerDay {
  id: number;
  user_id: number;
  company_id: number;
  address_id: number;
  order_date: string;
  order_amount: number;
  company_bonuse: number;
  employee_amount: number;
  count: number;
  is_delivered: number;
  created_at: string;
  updated_at: string;
  details: OrderDetailInMenu[];
}
