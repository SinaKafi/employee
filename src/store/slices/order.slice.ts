import { StateCreator } from "zustand";
import { produce } from "immer";
import { IOrderSlice } from "./orderSlice";

const initialState = {
  orders: {},
};

const orderSlice: StateCreator<IOrderSlice, [["zustand/devtools", never]]> = (
  set
) => {
  return {
    orderSlice: {
      state: initialState,
      action: {
        addOrder: (payload) => {
          set(
            produce((state) => {
              const { date, id, quantity } = payload;
              if (!state.orderSlice.state.orders[date]) {
                state.orderSlice.state.orders[date] = {};
              }
              if (quantity) {
                state.orderSlice.state.orders[date][id] = { count: quantity };

                return;
              }
              if (!state.orderSlice.state.orders[date][id]) {
                state.orderSlice.state.orders[date][id] = { count: 1 };
              } else {
                state.orderSlice.state.orders[date][id].count++;
              }
            }),
            false,
            "addOrder"
          );
        },
        decrement: (payload) => {
          set(
            produce((state: IOrderSlice) => {
              const { date, id } = payload;
              if (
                state.orderSlice.state.orders[date] &&
                state.orderSlice.state.orders[date][id]
              ) {
                state.orderSlice.state.orders[date][id].count--;
                if (state.orderSlice.state.orders[date][id].count <= 0) {
                  delete state.orderSlice.state.orders[date][id];
                }
                // Remove the date if no more orders exist for that date
                if (
                  Object.keys(state.orderSlice.state.orders[date]).length === 0
                ) {
                  delete state.orderSlice.state.orders[date];
                }
              }
            }),
            false,
            "decrement"
          );
        },
      },
    },
  };
};

export default orderSlice;
