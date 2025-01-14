import { Box, Button, Heading } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";
import useRouterDisclosure from "@/hooks/useRouterDisclosure";
import MyModal from "../typographi/modal";
import { useNavigate } from "react-router-dom";
import Spiner from "../common/Spiner";
import useCurrentUser from "@/hooks/useCurrentUser";

const CashLayout = ({ children }: PropsWithChildren) => {
  const { isOpen, onClose } = useRouterDisclosure("exit");
  const navigate = useNavigate();
  const { data, isLoading } = useCurrentUser();

  return isLoading || !!!data ? (
    <div>
      <div className="flex justify-center items-center h-screen flex-col gap-8">
        <img src="/logo.svg" className="block object-cover" width={500} />
        <Spiner className="p-24 border-8" containerStyle="h-auto" />
      </div>
    </div>
  ) : (
    <Box
      fontFamily={["Yekanbakh-fa", "Yekanbakh"]}
      className="flex flex-col h-screen max-h-screen overflow-hidden"
    >
      <Header />
      <div className="bg-alpha-blueGray overflow-hidden flex-1">
        <div className="flex container min-w-full !pr-0 w-full overflow-hidden">
          {/* Sidebar section */}
          <Sidebar mustCollapse />

          {/* Main content section */}
          <main className="flex-1 px-10 w-full mx-auto pr-30 mt-20 overflow-auto">
            <div>{children}</div>
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
      </MyModal>{" "}
    </Box>
  );
};

export default CashLayout;
