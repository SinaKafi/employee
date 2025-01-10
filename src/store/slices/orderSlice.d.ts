interface IOrderItem {
  date: string;
  id?: number | string;
  quantity?: number;
}

export interface IOrderData {
  orders?: Record<string, IOrderItem>;
}

export type IOrderSlice = {
  orderSlice: {
    state: {
      orders?: IOrderData;
    };
    action: {
      addOrder: (_?: IOrderItem) => void;
      decrement: (_?: IOrderItem) => void;
    };
  };
};
