import SVGCalendar from "@/components/svgs/SVGCalendar";
import SVGExport from "@/components/svgs/SVGExport";
import CustomTable from "@/components/table";
import useApi from "@/hooks/useQuery";
import useQueryParams from "@/hooks/useSearchParams";
import { services } from "@/services";
import { IOrderDataPerMonth } from "@/services/order/order";
import { Button, Heading, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const CompanyOrderList = () => {
  const { page, perPage, query } = useQueryParams("search");

  const columns: ColumnDef<IOrderDataPerMonth>[] = [
    {
      accessorKey: "order_date",
      header: "تاریخ",

      cell: (info) => (
        <Text variant={"sm"} className="w-full flex items-center  gap-4 ">
          <SVGCalendar className="bg-alpha-sidebarMain rounded-lg text-alpha-secondaryMain inline-block" />
          {(info as any).getValue()}
        </Text>
      ), // Automatically types info based on `Order` i cant find correct color for calender
    },
    {
      accessorKey: "count",
      header: "تعداد",
      cell: (info) => (
        <Text variant={"sm"} className="w-full ">
          {(info as any).getValue()} عدد
        </Text>
      ),
    },
    {
      accessorKey: "order_amount",
      header: "مبلغ کل",
      cell: (info) => (
        <Text variant={"sm"} className="w-full ">
          {(info as any)?.getValue()?.toLocaleString()} تومان
        </Text>
      ),
    },
    {
      accessorKey: "company_bonuse",
      header: "جمع سهم شرکت",
      cell: (info) => (
        <Text variant={"sm"} className="w-full ">
          {Number((info as any).getValue())?.toLocaleString()} تومان
        </Text>
      ),
    },
    {
      accessorKey: "employee_amount",
      header: "سهم شما",
      cell: (info) => (
        <Text variant={"sm"} className="w-full ">
          {Number((info as any).getValue())?.toLocaleString()} تومان
        </Text>
      ),
    },
  ];
  const [currentDate] = useState(dayjs().locale("fa").calendar("jalali"));

  const currentMonth = currentDate.format("MM YYYY");
  const { data, isLoading } = useApi(
    {
      apiFetcher: services.orderServices.getOrderList,
      options: {
        params: {
          month: String(query ?? currentMonth).split(" ")[0],
          year: String(query ?? currentMonth).split(" ")[1],
          page,
          per_page: perPage,
        },
      },
    },
    [query, page, perPage]
  );

  const tableDate = useMemo(() => {
    return data?.data || [];
  }, [data]);

  return (
    <div className="bg-white min-h-full rounded-lg px-24 py-18 flex flex-col space-y-10 justify-between ">
      <div className="w-full flex justify-between items-center">
        <div>
          <Heading className="!text-18 !font-bold !px-16 !py-8">
            لیست سفارش ها
          </Heading>
        </div>
        <div className="flex justify-between gap-12">
          <div className="w-full">
            <Button size={"md"} className="flex items-center gap-8 px-16 py-8">
              <SVGExport />
              خروجی اکسل
            </Button>
          </div>
        </div>
      </div>

      <CustomTable
        metadata={{
          total: data?.meta?.total,
        }}
        columns={columns}
        isLoading={isLoading}
        data={tableDate}
        searchMode="DATE_PICKER"
      />
    </div>
  );
};

export default CompanyOrderList;
