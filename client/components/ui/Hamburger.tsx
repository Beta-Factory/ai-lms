"use client";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

import { Menulinks } from "../sideBar/SideBarMain";
import MenuItemCard from "./MenuItemCard";

const Hamburger = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="px-3 rounded-2xl flex items-center gap-1 ">
          <span>
            <MenuIcon className="text-[#808080]" />
          </span>
        </SheetTrigger>
        <SheetContent className="bg-[#F5F5F5] text-slate-700">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              <div className="mt-8 flex flex-col gap-2">
                {Menulinks.map((link, idx) => (
                  <MenuItemCard
                    name={link.label}
                    key={idx}
                    menuIcon={link.icon}
                  />
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Hamburger;
