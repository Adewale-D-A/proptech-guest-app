/** @format */

import { NavLink } from "@/types/type";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { CgAddR } from "react-icons/cg";
import { LiaMountainSolid } from "react-icons/lia";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineHelpOutline } from "react-icons/md";

export const navigationOptions: NavLink[] = [
  {
    id: "1",
    title: "Personal Info",
    href: `/dashboard`,
    icon: <FaRegUser />,
  },
  {
    id: "2",
    title: "Bookings",
    href: `/bookings`,
    icon: <MdOutlineDateRange />,
  },
  {
    id: "3",
    title: "Make a Request",
    href: `/make-a-request`,
    icon: <TbUserQuestion />,
  },
  {
    id: "4",
    title: "Additional Services",
    href: `/additional-services`,
    icon: <CgAddR />,
  },
  {
    id: "5",
    title: "Adventures",
    href: `/adventures`,
    icon: <LiaMountainSolid />,
  },
  {
    id: "6",
    title: "Referrals",
    href: `/referrals`,
    icon: <IoSettingsOutline />,
  },
  {
    id: "7",
    title: "Notification",
    href: `/notification`,
    icon: <IoNotificationsOutline />,
  },
  {
    id: "8",
    title: "Contact Us",
    href: `/contact-us`,
    icon: <MdOutlineHelpOutline />,
  },
];
