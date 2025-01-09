import SVGArrowNarrowLeft from "@/components/svgs/SVGArrowNarrowLeft";
import SVGCalendar from "@/components/svgs/SVGCalendar";
import SVGExport from "@/components/svgs/SVGExport";
import CustomTable from "@/components/table";
import { Button, Heading, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

type Order = {
  id: number;
  date: string | Date;
  quantity: number | string;
  totalPrice: number;
  totalShareCompany: number;
};

const data: Order[] = [
  {
    id: 0,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 1,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 2,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 3,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 4,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 5,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 6,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 7,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 8,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 9,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 10,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 11,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 12,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
  {
    id: 13,
    date: "1403/02/2",
    quantity: 30,
    totalPrice: 2342000,
    totalShareCompany: 700000,
  },
];

const CompanyOrderList = () => {
  const nagigate = useNavigate();
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "date",
      header: "تاریخ",

      cell: (info) => (
        <Text variant={"sm"} className="w-full flex items-center  gap-4 ">
          <SVGCalendar className="bg-alpha-sidebarMain rounded-lg text-alpha-secondaryMain inline-block" />
          {(info as any).getValue()}
        </Text>
      ), // Automatically types info based on `Order` i cant find correct color for calender
    },
    {
      accessorKey: "quantity",
      header: "تعداد",
      cell: (info) => (
        <Text variant={"sm"} className="w-full ">
          {(info as any).getValue()} عدد
        </Text>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "مبلغ کل",
      cell: (info) => (
        <Text variant={"sm"} className="w-full ">
          {(info as any).getValue().toLocaleString()} تومان
        </Text>
      ),
    },
    {
      accessorKey: "totalShareCompany",
      header: "جمع سهم شرکت",
      cell: (info) => (
        <Text variant={"sm"} className="w-full ">
          {Number((info as any).getValue()).toLocaleString()} تومان
        </Text>
      ),
    },
    {
      accessorKey: "id",
      header: "عملیات",
      cell: (info) => (
        <Text
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nagigate(`/orders/${info.getValue()}`);
          }}
          className="flex items-center  gap-8 cursor-pointer"
        >
          جزئیات
          <SVGArrowNarrowLeft
            width={26}
            height={24}
            className=" bg-alpha-primaryBg py-4 px-6 rounded-md !text-primary-500"
          />
        </Text>
      ),
    },
  ];

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
            {" "}
            <Button size={"md"} className="flex items-center gap-8 px-16 py-8">
              <SVGExport />
              خروجی اکسل{" "}
            </Button>
          </div>
        </div>
      </div>

      <CustomTable
        metadata={{
          total: data?.length,
        }}
        columns={columns}
        data={data}
        searchMode="DATE_PICKER"
      />
    </div>
  );
};

export default CompanyOrderList;
