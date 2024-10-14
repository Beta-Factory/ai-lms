import { ReactNode } from "react";

import { SideBarMain } from "@/components/sideBar/SideBarMain";
import Hamburger from "@/components/ui/Hamburger";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
      <main>{children}</main>
    </div>
  );
};

export default Layout;
