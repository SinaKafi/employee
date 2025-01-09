import { Box, Button, Heading } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";
import useRouterDisclosure from "@/hooks/useRouterDisclosure";
import MyModal from "../typographi/modal";
import { useNavigate } from "react-router-dom";
import useMyStore from "@/store/store";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import Spiner from "../common/Spiner";

const CashLayout = ({ children }: PropsWithChildren) => {
  const { isOpen, onClose } = useRouterDisclosure("exit");
  const navigate = useNavigate();
  const { action } = useMyStore((state) => state.userSlice);
  const { isLoading, data } = useApi({
    apiFetcher: services.userServices.getCurrentUser,
    options: {
      enabled: localStorage.getItem("token") ? true : false,
      onSuccess(data) {
        action.setProfileData(data.data);
      },
    },
  });

  const { isLoading: addressLoading } = useApi({
    apiFetcher: services.companyServices.addressList,
    options: {
      enabled: true,
      onSuccess(data) {
        action.setCompanyAddress(data.data);
      },
    },
  });

  return addressLoading || isLoading || !!!data ? (
    <div>
      <div className="flex justify-center items-center h-screen flex-col gap-8">
        <img src="/logo.svg" className="block object-cover" width={500} />
        <Spiner className="p-24 border-8" containerStyle="h-auto" />
      </div>
    </div>
  ) : (
    <Box
      fontFamily={["Yekanbakh-fa,  Yekanbakh "]}
      className="flex flex-col h-screen overflow-hidden"
    >
      <Header />
      <div className=" bg-alpha-blueGray">
        {/* <div className="flex container max-w-[1440px]  w-full "> */}
        <div className="flex container min-w-full !pr-0 w-full ">
          <Sidebar mustCollapse />
          <main className="flex-1  w-full mx-auto pr-30 30 py-30  flex-grow max-h-[95vh] min-h-[95vh]">
            {children}
          </main>
        </div>
      </div>

      <MyModal
        isOpen={isOpen}
        onClose={onClose}
        header={"خروج"}
        isCentered
        size="md"
      >
        <div className="flex flex-col justify-center items-center gap-32">
          <Heading variant={"md"}>ایا برای خروج مطمعن هستید؟</Heading>
          <div className="flex gap-16 item-center">
            <div>
              <Button className="!px-32" onClick={onClose}>
                {" "}
                انصراف
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login", { replace: true });
                }}
                className="!px-32"
                variant="outline"
              >
                خروج
              </Button>
            </div>
          </div>
        </div>
      </MyModal>
    </Box>
  );
};

export default CashLayout;
