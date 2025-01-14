import { Heading, InputProps, Skeleton, Text } from "@chakra-ui/react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import React, { useCallback, useReducer, useRef } from "react";
import CustomSelect from "../common/CustomSelect";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import CustomInput from "../common/CustomInput";
import SVGSearch from "../svgs/SVGSearch";
import useDebounceEffect from "@/hooks/useDeboounceEffect";
import PersianMonthNavigator from "../common/DateNagigator";

type Metadata = {
  total: number;
  prevPage?: number | string;
};

interface CustomTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  search?: undefined | InputProps;
  metadata: Metadata;
  isLoading?: boolean;
  searchMode?: "DATE_PICKER" | "INPUT" | null;
}

type State = {
  query: string;
  perPage: string;
  page: string;
};

const CustomTable = <TData,>({
  columns,
  data,
  search,
  metadata,
  isLoading,
  searchMode,
}: CustomTableProps<TData>) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const parsedSearchTerm = searchTerm ? JSON.parse(searchTerm) : {};
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useReducer(
    (state: State, updates: Partial<State>) => ({
      ...state,
      ...updates,
    }),
    {
      query: parsedSearchTerm?.query || "",
      perPage: parsedSearchTerm?.perPage || "10",
      page: parsedSearchTerm?.page || "1",
    }
  );
  const tableInstance = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: metadata?.total,
    debugCells: true,
    manualPagination: true,
  });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(() => {
    const { query, perPage, page } = inputValue;
    const newParams = new URLSearchParams(searchParams);
    const inputStringify = JSON.stringify(inputValue);

    if (!query && perPage === "10" && page === "1" && searchParams.size === 0) {
      return;
    }

    if (elementRef.current) {
      elementRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (query || perPage || page) {
      newParams.set("search", inputStringify);
    } else {
      newParams.delete("search");
    }

    navigate(`?${newParams}`, { replace: true });
  }, [inputValue, searchParams]);

  const handleInputChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue({ [key]: e.target.value, page: "1" });
    };

  useDebounceEffect(handleSearch, [inputValue], 500);

  return (
    <div className="flex flex-col max-h-[75vh] min-h-[75vh] justify-between">
      <div className="w-full flex items-center justify-between">
        <div className="w-1/2">
          <div className="!w-2/3">
            {searchMode == "DATE_PICKER" && (
              <PersianMonthNavigator
                onChange={(e) => {
                  setInputValue({ query: e });
                }}
                value={inputValue.query}
              />
            )}
            {searchMode === "INPUT" && (
              <CustomInput
                isDisabled={isLoading}
                size="base"
                value={inputValue.query}
                {...search}
                onChange={handleInputChange("query")}
                rightElement={
                  <SVGSearch className="!mb-14 !text-alpha-text10" />
                }
              />
            )}
          </div>
        </div>
        <div className="w-1/2 lg:w-1/4 flex justify-between items-center">
          <div className="flex gap-8 items-center">
            <Text
              variant="sm-regular"
              color="alpha.text20"
              className="whitespace-pre"
            >
              تعداد نمایش
            </Text>
            <CustomSelect
              size="sm"
              isLoading={isLoading}
              className="!bg-secondaryGray !border-none !text-alpha-text40"
              onChange={(e) => setInputValue({ perPage: String(e), page: "1" })}
              value={inputValue.perPage}
              options={[
                { label: "10", value: "10" },
                { label: "25", value: "25" },
                { label: "50", value: "50" },
                { label: "75", value: "75" },
                { label: "100", value: "100" },
              ]}
            />
          </div>
          <Text variant="sm-regular" color="alpha.text20" className="flex">
            تعداد کل:{" "}
            <Skeleton isLoaded={!isLoading}>
              <b className="mx-2">{metadata?.total ?? data?.length}</b>
            </Skeleton>{" "}
            مورد
          </Text>
        </div>
      </div>
      <div
        className="flex-1 w-full flex flex-col overflow-y-scroll overflow-x-hidden"
        ref={elementRef}
      >
        {data && (
          <table className="w-full">
            <thead
              className="w-full !sticky !top-0 bg-white shadow-sm z-50"
              style={{ boxShadow: "0px 1px 1px rgba(0,0,0,0.1)" }}
            >
              {tableInstance.getHeaderGroups().map((headerGroup, index) => (
                <tr key={`table-${headerGroup.id}+${index}+`}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="!text-right px-24">
                      <Skeleton isLoaded={!isLoading}>
                        <Heading variant="md" className="!py-16">
                          {header.isPlaceholder
                            ? null
                            : typeof header.column.columnDef.header ===
                                "function"
                              ? header.column.columnDef.header(
                                  header.getContext()
                                )
                              : header.column.columnDef.header}
                        </Heading>
                      </Skeleton>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstance?.getRowModel()?.rows?.map((row) => {
                return (
                  <tr key={row.id} className="border-b">
                    {row?.getVisibleCells()?.map((cell) => (
                      <td key={cell?.id} className="!text-right py-16">
                        {isLoading ? (
                          <Skeleton className="w-full h-45 my-4" />
                        ) : (
                          <Text variant="sm" className="!text-right pr-24">
                            {typeof cell?.column?.columnDef?.cell === "function"
                              ? cell?.column?.columnDef?.cell(
                                  cell?.getContext()
                                )
                              : cell?.column?.columnDef?.cell}
                          </Text>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {isLoading &&
          [...Array(+inputValue.perPage)].map((_, index) => (
            <Skeleton key={index} className="w-full h-45 my-4" />
          ))}
        {!isLoading && (!!!data || !data.length) && (
          <Heading className="mx-auto text-center mt-50">
            No data to show
          </Heading>
        )}
      </div>
      <div className="flex justify-start items-center mt-4">
        <Skeleton className="my-4" isLoaded={!isLoading}>
          <Pagination
            total={Math.ceil(
              Number(metadata?.total) / +Number(inputValue.perPage) || 1
            )}
            current={Number(inputValue?.page)}
            onPageChange={(page) => setInputValue({ page: String(page) })}
          />
        </Skeleton>
      </div>
    </div>
  );
};

export default CustomTable;
