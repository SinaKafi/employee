import useApi from "./useQuery";
import useMyStore from "@/store/store";
import { services } from "@/services";

const useCurrentUser = () => {
  const { action } = useMyStore((state) => state.userSlice);
  const { isLoading, data, refetch, isError, isSuccess, error } = useApi({
    apiFetcher: services.userServices.getCurrentUser,
    options: {
      enabled: localStorage.getItem("token") ? true : false,
      onSuccess(data) {
        action.setProfileData(data.data);
      },
    },
  });
  return { isLoading, data, refetch, isError, isSuccess, error };
};

export default useCurrentUser;
