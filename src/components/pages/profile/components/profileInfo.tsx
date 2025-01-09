import SVGArrowNarrowRight from "@/components/svgs/SVGArrowNarrowRight";
import { Avatar, Heading, Text, useDisclosure } from "@chakra-ui/react";
import EditUserModal from "./EditUserModal";
import useMyStore from "@/store/store";
import SVGEdit from "@/components/svgs/SVGEdit";

const ProfileInfo = () => {
  const addUserDisclosure = useDisclosure();
  const { mobile, name, family, company_name } = useMyStore(
    (state) => state.userSlice.state.userData.profileData
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="px-24  py-18 bg-white rounded-t-lg ">
        <Heading className="!text-18 !font-bold">
          <SVGArrowNarrowRight className="inline" />
          اطلاعات شرکت
        </Heading>
      </div>
      <div className=" grid grid-cols-4 gap-8  py-18 w-full px-32  bg-white">
        <Heading variant={"md"} className="!text-right">
          نام و نام خانوادگی نماینده
        </Heading>
        <Heading variant={"md"} className="!text-right">
          نام کاربری{" "}
        </Heading>
        <Heading variant={"md"} className="!text-right">
          نام شرکت
        </Heading>
        <Heading variant={"md"} className="!text-center">
          عملیات
        </Heading>
      </div>
      <div className=" grid grid-cols-4 gap-8 py-18 w-full px-32  bg-white rounded-b-lg">
        <Text variant={"sm"} className="!text-right flex items-center">
          <Avatar className="inline !rounded-lg !w-36 !h-36 ml-8" /> {name}{" "}
          {family}
        </Text>
        <Text variant={"sm"} className="!text-right flex items-center">
          {mobile}
        </Text>
        <Text variant={"sm"} className="!text-right flex items-center">
          {company_name}
        </Text>

        <Text
          className="!text-primary-500  !text-center !flex justify-center !items-center cursor-pointer"
          onClick={addUserDisclosure.onToggle}
        >
          ویرایش <SVGEdit className="" />
        </Text>
      </div>
      <EditUserModal {...addUserDisclosure} />
    </div>
  );
};
export default ProfileInfo;
