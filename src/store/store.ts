import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IUserSlice } from "./slices/userslice";
import userSlice from "./slices/user.slice";
import { IOrderSlice } from "./slices/orderSlice";
import orderSlice from "./slices/order.slice";

export const resetters: (() => void)[] = [];
export const resetAllSlices = () => resetters.forEach((resetter) => resetter());

type IMyStore = IUserSlice & IOrderSlice;

const useMyStore = create<IMyStore>()(
  devtools((...a) => ({
    ...userSlice(...a),
    ...orderSlice(...a),
  }))
);
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useMyStore);
}
export default useMyStore;
