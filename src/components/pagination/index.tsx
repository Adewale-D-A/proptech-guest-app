/** @format */

import React from "react";
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import { ButtonPaginationProps, PaginationTableProps } from "@/types/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_shared/select";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const ButtonPagination = (props: ButtonPaginationProps) => {
  const { children, index, setPageIndex, pageIndex, handleOnChange } = props;
  const handleOnChangeIndex = () => {
    setPageIndex(index);
    handleOnChange(index);
  };
  const isActive = pageIndex === index;

  return (
    <button
      onClick={handleOnChangeIndex}
      style={{
        width: "32px",
        height: "32px",
        color: isActive ? "white" : "#000",
        borderRadius: "100%",
        border: `0.5px solid ${isActive ? "#008DD5" : "#CBD5E0"}`,
        cursor: "pointer",
        margin: "0 4px",
        backgroundColor: isActive ? "#284499" : "transparent",
      }}
    >
      {children}
    </button>
  );
};

const PaginationTable = (props: PaginationTableProps) => {
  const {
    pageSize,
    pageIndex,
    setPageIndex,
    totalItemsCount,
    handleOnChange,
    setPageSize,
  } = props;

  const TOTAL_INDEX = Math.ceil(totalItemsCount / pageSize);

  const showButtons = () => {
    const buttons = [];
    const MAX_VISIBLE_PAGES = 2;

    buttons.push(
      <ButtonPagination
        key={0}
        setPageIndex={setPageIndex}
        handleOnChange={handleOnChange}
        index={0}
        pageIndex={pageIndex}
      >
        1
      </ButtonPagination>
    );

    if (TOTAL_INDEX <= MAX_VISIBLE_PAGES) {
      for (let index = 1; index < TOTAL_INDEX - 1; index++) {
        buttons.push(
          <ButtonPagination
            key={index}
            setPageIndex={setPageIndex}
            handleOnChange={handleOnChange}
            index={index}
            pageIndex={pageIndex}
          >
            {index + 1}
          </ButtonPagination>
        );
      }
    } else {
      const startPage = Math.max(pageIndex - 1, 1);
      const endPage = Math.min(pageIndex + 1, TOTAL_INDEX - 2);

      if (startPage > 1) {
        buttons.push(
          <span key="start-ellipsis" style={{ margin: "0 4px" }}>
            ...
          </span>
        );
      }

      for (let index = startPage; index <= endPage; index++) {
        buttons.push(
          <ButtonPagination
            key={index}
            setPageIndex={setPageIndex}
            handleOnChange={handleOnChange}
            index={index}
            pageIndex={pageIndex}
          >
            {index + 1}
          </ButtonPagination>
        );
      }

      if (endPage < TOTAL_INDEX - 2) {
        buttons.push(
          <span key="end-ellipsis" style={{ margin: "0 4px" }}>
            ...
          </span>
        );
      }
    }

    buttons.push(
      <ButtonPagination
        key={TOTAL_INDEX - 1}
        setPageIndex={setPageIndex}
        handleOnChange={handleOnChange}
        index={TOTAL_INDEX - 1}
        pageIndex={pageIndex}
      >
        {TOTAL_INDEX}
      </ButtonPagination>
    );

    const isPrevActive = pageIndex > 0;
    buttons.unshift(
      <button
        key="prev"
        onClick={() => {
          setPageIndex(pageIndex - 1);
          handleOnChange(pageIndex - 1);
        }}
        disabled={!isPrevActive}
        style={{
          color: isPrevActive ? "black" : "black",
          cursor: isPrevActive ? "pointer" : "not-allowed",
          margin: "0 4px",
        }}
        aria-label="Previous"
        className={`border w-8 h-8 rounded-full flex items-center justify-center ${
          isPrevActive ? "border-primary text-white" : "border-[#BDBDBD]"
        }`}
      >
        <IoIosArrowRoundBack color={isPrevActive ? "#284499" : "#BDBDBD"} />
      </button>
    );

    const isNextActive = pageIndex + 1 < TOTAL_INDEX;
    buttons.push(
      <button
        key="next"
        onClick={() => {
          setPageIndex(pageIndex + 1);
          handleOnChange(pageIndex + 1);
        }}
        disabled={!isNextActive}
        style={{
          color: isNextActive ? "black" : "black",
          cursor: isNextActive ? "pointer" : "not-allowed",
          margin: "0 4px",
        }}
        aria-label="Next"
        className={`border w-8 h-8 rounded-full flex items-center justify-center ${
          isNextActive ? "border-primary text-white" : "border-[#BDBDBD]"
        }`}
      >
        <IoIosArrowRoundForward color={isNextActive ? "#284499" : "#BDBDBD"} />
      </button>
    );

    return buttons;
  };

  return (
    <>
      {totalItemsCount > 10 && (
        <div
          style={{
            display: "flex",
            padding: "8px 0",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "4px" }}>{showButtons()}</div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="text-sm">Showing result:</span>
            <Select
              onValueChange={(value: string) =>
                setPageSize && setPageSize(Number(value))
              }
            >
              <SelectTrigger className="text-xs w-16 text-black font-light border border-[#EDEFF3] h-10">
                <SelectValue placeholder={`${pageSize}`} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {[5, 10, 25, 50, 100].map((size) => (
                  <SelectItem
                    key={size}
                    value={size.toString()}
                    className="text-sm cursor-pointer"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationTable;
