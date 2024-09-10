/** @format */

import React from "react";
import { Card } from "../_shared/card";

const CardSkeleton = () => {
  return (
    <div className="w-full">
      <Card
        role="status"
        className="w-full p-4  rounded shadow-sm animate-pulse md:p-6 "
      >
        <div className="flex items-center justify-center h-48 mb-4 bg-gray-100 rounded dark:bg-gray-200">
          <svg
            className="animate-spin h-10 w-10 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-35"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
            ></path>
          </svg>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-200"></div>
        <div className="flex items-center mt-4">
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-200"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </Card>
    </div>
  );
};

export default CardSkeleton;
