import PersianMonthNavigator from "@/components/common/DateNagigator";
import SVGArrowNarrowLeft from "@/components/svgs/SVGArrowNarrowLeft";
import { Button, Heading, Switch, Text } from "@chakra-ui/react";
import UserOrdersCard from "./components/UserOrdersCard";
import SVGExport from "@/components/svgs/SVGExport";
import useApi from "@/hooks/useQuery";
import { services } from "@/services";
import { useParams } from "react-router-dom";
import SVGEdit from "@/components/svgs/SVGEdit";
import { useState } from "react";

const EditUser = () => {
  const { id } = useParams();
  const [userStatus, setUserStatus] = useState(false);
  const { data, isLoading } = useApi(
    {
      apiFetcher: services.userServices.getEmployeeData,
      options: {
        params: { id },
        enabled: !!id,
        onSuccess(data) {
          setUserStatus(data.data.is_active);
        },
      },
    },
    [id]
  );

  const { refetch } = useApi(
    {
      apiFetcher: services.userServices.changeEmployeeStatus,
      options: {
        autoFetch: false,
        onSuccess() {
          setUserStatus((prev) => !prev);
        },
      },
    },
    [id]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white min-h-full rounded-lg flex flex-col space-y-8 justify-between">
        <div className="border-b">
          <div className="px-24 flex items-center mx-auto py-14">
            <SVGArrowNarrowLeft className="rotate-180" />
            <Heading variant={"body"}>اطلاعات کاربر</Heading>
          </div>
        </div>
        <div className="px-32 border-b grid grid-cols-9 gap-8 py-14 w-full">
          <Heading variant={"md"} className="!text-right col-span-2">
            نام و نام خانوادگی
          </Heading>
          <Heading variant={"md"} className="col-span-2 !text-right">
            شماره پرسنلی
          </Heading>
          <Heading variant={"md"} className="col-span-2 !text-right">
            شماره موبایل
          </Heading>
          <Heading variant={"md"} className="col-span-2 !text-right">
            وضعیت
          </Heading>
          <Heading variant={"md"} className="!text-right">
            عملیات
          </Heading>
        </div>
        <div className="px-32 grid grid-cols-9 gap-8 py-14 w-full">
          <Text
            variant={"sm"}
            className={`${isLoading && "w-full h-5 rounded-large animate-pulse bg-alpha-text10"} !text-right col-span-2`}
          >
            {data?.data?.name ?? ""} {data?.data?.family ?? ""}
          </Text>
          <Text
            variant={"sm"}
            className={`${isLoading && "w-full h-5 rounded-large animate-pulse bg-alpha-text10"} col-span-2 !text-right`}
          >
            {data?.data?.code}{" "}
          </Text>
          <Text
            variant={"sm"}
            className={`${isLoading && "w-full h-5 rounded-large animate-pulse bg-alpha-text10"} col-span-2 !text-right`}
          >
            {data?.data?.mobile}{" "}
          </Text>
          <Text
            variant={"sm"}
            className={`${isLoading && "w-full h-5 rounded-large animate-pulse bg-alpha-text10"} col-span-2 !text-right`}
          >
            <Switch
              isChecked={userStatus}
              onChange={() => refetch({ user_id: id })}
            />
          </Text>
          <Text
            variant={"sm"}
            className={`${isLoading && "w-full h-5 rounded-large animate-pulse bg-alpha-text10"} !text-primary-500 !text-right !flex justify-start gap-6 !items-start cursor-pointer`}
          >
            عملیات <SVGEdit className="" />
          </Text>
        </div>
      </div>

      <div className="bg-white min-h-full rounded-lg flex flex-col justify-between">
        <div className="px-24 flex flex-col gap-8 border-b py-18">
          <div className="flex items-center justify-between">
            <Heading variant={"body"}>لیست سفارش ها</Heading>
            <Button size={"md"} className="flex items-center gap-8 px-16 py-8">
              <SVGExport />
              خروجی اکسل{" "}
            </Button>
          </div>
          <div className="py-4">
            <PersianMonthNavigator />
          </div>
        </div>

        <div>
          <div className="border-b px-32 grid grid-cols-6 py-24">
            <div className="!text-right col-span-3">
              <Heading variant={"md"} className="!text-right">
                نام غذا
              </Heading>
            </div>
            <div>
              <Heading variant={"md"} className="!text-right">
                مبلغ غذا
              </Heading>
            </div>
            <div>
              <Heading variant={"md"} className="!text-right">
                تاریخ
              </Heading>
            </div>
            <div>
              <Heading variant={"md"} className="!text-right">
                سهم پرسنل
              </Heading>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[19.5rem]">
            <UserOrdersCard /> <UserOrdersCard /> <UserOrdersCard />
            <UserOrdersCard /> <UserOrdersCard /> <UserOrdersCard />
            <UserOrdersCard /> <UserOrdersCard /> <UserOrdersCard />
            <UserOrdersCard /> <UserOrdersCard /> <UserOrdersCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
