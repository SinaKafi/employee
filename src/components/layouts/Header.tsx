import { Avatar, Text } from "@chakra-ui/react";
import SVGbuilding from "../svgs/SVGbuilding";
import useMyStore from "@/store/store";

const Header = () => {
  const { state } = useMyStore((state) => state.userSlice);

  return (
    <div className="w-full z-50 min-h-63 max-h-63 shadow-haeder h-63">
      <div className=" flex px-24 items-center justify-between  container w-full min-w-full  ml-auto">
        <div>
          <img src="/logo.svg" className="block object-cover" width={180} />
        </div>
        <div className="flex max-w-1/3 justify-between items-center gap-38">
          <div className="flex gap-6 items-center">
            <div className="!rounded-lg bg-greyBlue !text-dark-primary-500   !p-4   ">
              <SVGbuilding className="text-[#BECAD8] w-24 h-24 mx-auto" />
            </div>
            <Text variant={"sm"}>
              {" "}
              {state.userData.profileData.company_name}
            </Text>{" "}
          </div>
          <div className="flex gap-6 items-center">
            <Avatar
              name={`${state?.userData?.profileData?.name} ${state?.userData?.profileData?.family}`}
              size={"sm"}
              className="!rounded-lg alpha-primaryBg  !text-primary-500  !w-32 !min-w-32 !max-w-32 !h-32 !min-h-32 !max-h-32  !p-10 !bg-primary-opacity-5"
            />
            <Text variant={"sm"}>
              {state?.userData?.profileData?.name +
                state?.userData?.profileData?.family}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
