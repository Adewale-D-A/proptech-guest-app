/** @format */

import React from "react";

interface StatusBadgeProps {
  status: string;
  desc: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, desc }) => {
  const getBadgeStyles = () => {
    switch (status) {
      case "pending":
        return "border";
      case "completed":
        return "text-[#00C814] bg-[#F0FDEF]";
      default:
        return "bg-[#E9E9E9]";
    }
  };

  const getTextStyles = () => {
    return status === "completed" ? "text-[#00C814]" : "";
  };

  return (
    <div
      className={`h-8 flex justify-center items-center w-20 rounded-full text-xs ${getBadgeStyles()}`}
    >
      <span className={getTextStyles()}>{desc}</span>
    </div>
  );
};

export default StatusBadge;
