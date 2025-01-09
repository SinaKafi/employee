import SVGChevronRight from "../svgs/SVGChevronRight";
import SVGChevronLeft from "../svgs/SVGChevronLeft";
import { Text } from "@chakra-ui/react";

type PaginationProps = {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ total, current, onPageChange }: PaginationProps) => {
  //   const getPaginationRange = (
  //     total: number,
  //     current: number,
  //     siblings: number = 2
  //   ): (number | string)[] => {
  //     const pages: (number | string)[] = [];
  //     const totalVisible = 2 * siblings + 5;
  //     if (total <= totalVisible) {
  //       return Array.from({ length: total }, (_, i) => i + 1);
  //     }
  //     if (total === 1) {
  //       return [1]; // Only one page, no need for ellipses or range.
  //     }

  //     pages.push(1);

  //     if (current - siblings > 2) {
  //       pages.push("...");
  //     }

  //     const start = Math.max(2, current - siblings);
  //     const end = Math.min(total - 1, current + siblings);

  //     for (let i = start; i <= end; i++) {
  //       pages.push(i);
  //     }

  //     if (current + siblings < total - 1) {
  //       pages.push("...");
  //     }

  //     pages.push(total);

  //     return pages;
  //   };

  const getPaginationRange = (
    total: number,
    current: number,
    siblings: number = 2
  ): (number | string)[] => {
    if (total === 1) {
      return [1]; // Only one page, no need for ellipses or range.
    }

    const pages: (number | string)[] = [];
    const totalVisible = 2 * siblings + 5;

    if (total <= totalVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if (current - siblings > 2) {
      pages.push("...");
    }

    const start = Math.max(2, current - siblings);
    const end = Math.min(total - 1, current + siblings);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current + siblings < total - 1) {
      pages.push("...");
    }

    pages.push(total);

    return pages;
  };
  const paginationRange = getPaginationRange(total, current);

  return (
    <nav className="w-fit rounded-lg bg-secondaryGray p-8  ">
      <div className="flex gap-14 items-center justify-start">
        <div
          className={`cursor-pointer ${
            current === 1 ? "!cursor-not-allowed" : ""
          } `}
          onClick={() => current > 1 && onPageChange(current - 1)}
        >
          <SVGChevronRight />
        </div>

        {paginationRange.map((page, index) => (
          <Text
            key={index}
            className={`page-item  ${
              typeof page === "number" &&
              "cursor-pointer px-2 py-2 bg-white w-32 h-32 !text-center rounded-xs border border-alpha-border"
            } ${
              page === current
                ? "!text-primary-500 !border-primary-500 !cursor-not-allowed"
                : typeof page === "number"
                  ? ""
                  : "cursor-not-allowed"
            }`}
            onClick={() => typeof page === "number" && onPageChange(page)}
          >
            {page}
          </Text>
        ))}

        <div
          className={`cursor-pointer ${
            current === total ? "!cursor-not-allowed" : ""
          }`}
          onClick={() => current < total && onPageChange(current + 1)}
        >
          <SVGChevronLeft />
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
