import { StateCreator } from "zustand";
import { produce } from "immer";
import { IUserSlice } from "./userslice";

const initialState = {
  userData: {},
  companyData: {},
};

const userSlice: StateCreator<IUserSlice, [["zustand/devtools", never]]> = (
  set
) => {
  return {
    userSlice: {
      state: initialState,
      action: {
        setProfileData: (payload) => {
          set(
            produce((state: IUserSlice) => {
              state.userSlice.state.userData.profileData = payload;
            }),
            false,
            "setProfileData"
          );
        },
        setCompanyAddress: (payload) => {
          set(
            produce((state: IUserSlice) => {
              state.userSlice.state.userData.companyData = payload;
            }),
            false,
            "setCompanyAddress"
          );
        },
      },
    },
  };
};

export default userSlice;
