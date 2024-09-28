/** @format */

import React from "react";
import { Loader2 } from "lucide-react";
import classNames from "classnames";
import { Button } from "../button";
import StarLoader from "@/components/loader/star-loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?:
    | "link"
    | "text"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  loadingText?: string;
  noStyle?: boolean;
  loadingClass?: string;
}

export const LoadingButton: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  variant,
  loadingText,
  noStyle = false,
  loadingClass,
  ...props
}) => {
  return (
    <Button
      className={classNames(
        `${
          noStyle
            ? ""
            : "w-full h-8 text-xs mt-6   rounded-full flex justify-center items-center"
        } `,
        className
      )}
      disabled={loading}
      {...props}
      variant={variant}
    >
      {loading ? (
        <div className={`${loadingClass} flex items-center`}>
          <section className="mr-2">
            <StarLoader />
          </section>

          {loadingText ? loadingText : "Please wait..."}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
