"use client";
import React, { useState } from "react";
import { cn } from "../lib/cn";
import { FaXTwitter } from "react-icons/fa6";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { BsEnvelope } from "react-icons/bs";
import { TbMailFilled } from "react-icons/tb";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {};

interface SideNavItemType {
  icon?: {
    icon: React.ReactNode;
    fillIcon: React.ReactNode;
  };
  label: string;
  href: string;
}

const sideBarItem: SideNavItemType[] = [
  {
    href: "/",
    label: "Home",
    icon: {
      icon: <GoHome />,
      fillIcon: <GoHomeFill />,
    },
  },
  {
    href: "/explore",
    label: "Explore",
    icon: {
      icon: <CiSearch />,
      fillIcon: <FiSearch />,
    },
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: {
      icon: <IoIosNotificationsOutline />,
      fillIcon: <IoMdNotifications />,
    },
  },
  {
    href: "/messages",
    label: "Messages",
    icon: {
      icon: <BsEnvelope />,
      fillIcon: <TbMailFilled />,
    },
  },
];

const Sidebar = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div
      className={cn(
        "min-h-screen max-h-screen overflow-y-auto w-fit md:pr-8 pr-3 pt-2 flex flex-col gap-3 border-r-[1px] pl-[50px] "
      )}
    >
      {/* Logo */}
      <HoverContainer>
        <Link href={"/"}>
          {" "}
          <FaXTwitter className="text-5xl" />{" "}
        </Link>
      </HoverContainer>

      {/* SideNavItems */}
      {sideBarItem.map((data, i) => (
        <HoverContainer key={i}>
          <SideNavItem
            icon={{ fillIcon: data.icon?.fillIcon, icon: data.icon?.icon }}
            label={data.label}
            href={data.href}
            isSidebarOpen={isSidebarOpen}
          />
        </HoverContainer>
      ))}

      <section
        className={cn(
          "flex w-full justify-end",
          !isSidebarOpen && "justify-start"
        )}
      >
        <HoverContainer>
          <RiArrowLeftDoubleFill
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(
              "text-4xl transition-all text-gray-400 ",
              !isSidebarOpen && "rotate-180"
            )}
          />
        </HoverContainer>
      </section>
      <div>Sidebar</div>
    </div>
  );
};

function SideNavItem({
  href,
  isSidebarOpen,
  label,
  icon,
}: SideNavItemType & { isSidebarOpen: boolean }) {
  const [animationParent] = useAutoAnimate();
  const pathName = usePathname();
  const isActivePage = pathName == href;
  return (
    <Link
      ref={animationParent}
      href={href}
      className=" flex gap-2 items-center "
    >
      {/* icon */}
      <div className=" text-3xl w-[35px] h-[35px] ">
        {isActivePage ? icon?.fillIcon : icon?.icon}
      </div>
      {isSidebarOpen && (
        <p
          className={cn(
            "text-xl hidden md:block pr-2 transition-all ",
            isActivePage && "font-bold"
          )}
        >
          {" "}
          {label}{" "}
        </p>
      )}
    </Link>
  );
}

function HoverContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className="hover:bg-gray-200 rounded-full p-3 cursor-pointer transition-all
    group-hover:dark:bg-zinc-900 group-hover:bg-gray-200 "
    >
      {children}
    </div>
  );
}

export default Sidebar;
