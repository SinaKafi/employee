import { IAddress } from "@/services/company/adress";
import { currentUser } from "@/services/user/user";
import { ISidebarListItem } from "@app/type/components/type.navigation";
import { ICreditCardData } from "@app/type/type.bank";

export interface IUserData {
  profileData?: currentUser;
  companyData?: IAddress[];
}

export type IUserSlice = {
  userSlice: {
    state: {
      userData?: IUserData;
    };
    action: {
      setProfileData: (_?: IProfileData) => void;
      setCompanyAddress: (_?: IAddress[]) => void;
    };
  };
};
