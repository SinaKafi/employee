import { useCallback, useState, useRef } from "react";
import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import SVGDownload from "@/components/svgs/SVGDownload";
import SVGPlus from "@/components/svgs/SVGPlus";
import SVGArrowNarrowLeft from "@/components/svgs/SVGArrowNarrowLeft";
import CustomTable from "@/components/table";
import AddUserModal from "./AddUserModal";
import useApi from "@/hooks/useQuery";
import useQueryParams from "@/hooks/useSearchParams";
import { services } from "@/services";
import { IEmployee } from "@/services/user/user";

const PersonaList = () => {
  const navigate = useNavigate();
  const { page, perPage, query } = useQueryParams("search");
  const addUserDisclosure = useDisclosure();
  const [users, setUser] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, refetch } = useApi(
    {
      apiFetcher: services.userServices.getEmployeeList,
      options: {
        params: { page: page || "1", perPage: perPage || "10", search: query },
        onSuccess(data) {
          setUser(data?.data);
        },
      },
    },
    [page, perPage, query]
  );

  const columns: ColumnDef<IEmployee>[] = [
    {
      accessorFn: (row) => `${row?.name} ${row?.family}`,
      header: "نام و نام خانوادگی",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row?.code,
      header: "شماره پرسنلی",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "mobile",
      header: "شماره موبایل",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row?.is_active,
      header: "وضعیت",
      cell: (info) => {
        const isActive = info.getValue();
        return (
          <Text
            className={`flex max-w-80 text-center items-center justify-center py-2 rounded-md ${
              isActive
                ? "text-success-500 bg-success-50"
                : "text-error-500 bg-error-50"
            }`}
            variant="caption-medium"
          >
            {isActive ? "فعال" : "غیرفعال"}
          </Text>
        );
      },
    },
    {
      accessorFn: (row) => row.id,
      header: "عملیات",
      cell: useCallback(
        (props) => (
          <Text
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/users/edit/${props.getValue()}`);
            }}
            className="flex items-center gap-8 cursor-pointer"
            aria-label="جزئیات پرسنل"
          >
            جزئیات
            <SVGArrowNarrowLeft
              width={26}
              height={24}
              className="bg-alpha-primaryBg py-4 px-6 rounded-md text-primary-500"
            />
          </Text>
        ),
        [navigate]
      ),
    },
  ];

  const { refetch: addFile } = useApi({
    apiFetcher: services.userServices.addByExcel,
    options: {
      autoFetch: false,
      onSuccess() {
        refetch();
      },
    },
  });

  return (
    <div className="bg-white min-h-full rounded-lg px-24 py-18 flex flex-col space-y-10 justify-between">
      <div className="w-full flex justify-between items-center">
        <Heading className="!text-18 !font-bold px-16 py-8">لیست پرسنل</Heading>
        <div className="flex gap-12">
          <Button
            size="md"
            variant="outline"
            aria-label="ورود اطلاعات"
            onClick={() => inputRef.current?.click()}
          >
            <SVGDownload />
            ورود اطلاعات
          </Button>
          <Button
            size="md"
            onClick={addUserDisclosure.onToggle}
            aria-label="افزودن پرسنل جدید"
          >
            <SVGPlus />
            افزودن پرسنل جدید
          </Button>
        </div>
      </div>
      <input
        type="file"
        accept=".xlsx"
        ref={inputRef}
        className="hidden"
        onChange={(e) => {
          e.preventDefault();
          let files = e.target.files[0];
          console.log(files);
          addFile({ file: files });
        }}
      />
      <CustomTable
        metadata={{ total: data?.meta[0]?.total }}
        isLoading={isLoading}
        columns={columns}
        data={users}
        search={{ placeholder: "جستجو......" }}
      />

      <AddUserModal {...addUserDisclosure} refetch={refetch} />
    </div>
  );
};

export default PersonaList;
