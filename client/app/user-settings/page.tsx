import { SideBarMain } from "@/components/sideBar/SideBarMain";
import Hamburger from "@/components/ui/Hamburger";
import UserProfileSettings from "@/components/userAccountSettings/UserProfileSettings";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-row max-md:flex-col gap-10 w-full">
      {/* sidebar logic begin */}
      <div>
        <div className="max-md:hidden">
          <SideBarMain />
        </div>
        <div className="hidden max-md:flex w-[100%] justify-start mt-5 fixed">
          <Hamburger />
        </div>
      </div>
      {/* sidebar logic end */}

      <UserProfileSettings />
    </div>
  );
};

export default page;
