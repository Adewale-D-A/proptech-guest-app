/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  default?: boolean;
};

const Logo = (props: LogoProps) => (
  <div
    className={`
      "flex items-center h-full justify-between  md:block"
    ${props.className}
    `}
  >
    <Link href={"/"}>
      <Image
        src={
          props.default ? "/images/logo-color.png" : "/images/logo-white.png"
        }
        width={props.width ?? 92}
        height={props.height ?? 116}
        style={{ margin: 0 }}
        alt="The spotlagos"
        loading="lazy"
        className={props.className}
      />
    </Link>
  </div>
);
export default Logo;
