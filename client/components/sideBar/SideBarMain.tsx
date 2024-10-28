"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/AnimatedSideBar";

import { cn } from "@/lib/utils";
import {
  House,
  LayoutGrid,
  LucideSidebarClose,
  LucideSidebarOpen,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../ui/Toggle";
import UserAvatar from "../userAccountSettings/UserAvatar";

export const Menulinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <House className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Explore Agents",
    href: "/dashboard/agents",
    icon: (
      <LayoutGrid className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },

  {
    label: "User Profile",
    href: "/dashboard/user-settings",
    icon: <UserAvatar />,
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export function SideBarMain() {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [currentLink, setCurrentLink] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   console.log("Current Link:", currentLink);
  //   console.log("Pathname:", pathname);
  // }, [currentLink, pathname]);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-neutral-200",
        "h-full"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={animate}>
        <SidebarBody className="justify-between gap-10 h-screen bg-neutral-200">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div
              className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 cursor-pointer ml-auto mr-4"
              onClick={() => {
                setAnimate(!animate);
              }}
            >
              {animate ? (
                <LucideSidebarOpen className="shadow-md" />
              ) : (
                <LucideSidebarClose className="text-blue-600 dark:text-blue-400 dark:shadow-slate-200" />
              )}
            </div>
            <div className="mt-8 flex flex-col gap-5">
              {Menulinks.filter((link) => link.label !== "Logout").map(
                (link, idx) => (
                  <div
                    className="hover:font-semibold border-2 border-transparent hover:border-slate-500 hover:dark:border-slate-200 hover:rounded-md"
                    key={idx}
                    onClick={() => {
                      setCurrentLink(link.href);

                      router.push(link.href);
                    }}
                  >
                    <SidebarLink
                      className={`${
                        currentLink === link.href || pathname === link.href
                          ? `text-blue-500`
                          : ``
                      } `}
                      link={link}
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <ModeToggle />
          <div className="mt-auto">
            {Menulinks.filter((link) => link.label === "Logout").map(
              (link, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentLink(link.href);
                    router.push(link.href);
                  }}
                >
                  <SidebarLink
                    className={`hover:font-bold ${
                      currentLink === link.href || pathname === link.href
                        ? `text-blue-500`
                        : ``
                    } `}
                    link={link}
                  />
                </div>
              )
            )}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

// un used components-----------------
export const Logo = () => {
  return (
    <Link
      onClick={() => {
        console.log("Logo clicked");
      }}
      href="#"
      className={`font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20`}
    >
      <div
        className={cn(
          `h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0`
        )}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
