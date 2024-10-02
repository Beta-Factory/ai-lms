import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "lucide-react";
import UserInfoCard from "./UserInfoCard";
import ExploreAgentsCard from "./ExploreAgentsCard";

const Hamburger = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="px-3 rounded-2xl flex items-center gap-1 ">
          <span>
            <Sidebar className="text-[#808080]" />
          </span>
        </SheetTrigger>
        <SheetContent className="bg-[#F5F5F5] text-slate-700">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              {/* user info */}
              <UserInfoCard />

              {/* explore agents */}
              <ExploreAgentsCard />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Hamburger;
