// import { Sidebar } from "lucide-react";
"use client";
import { Sidebar } from "@/components/ui/AnimatedSideBar";
import { SideBarMain } from "@/components/sideBar/SideBarMain";
import AgentsPage from "@/components/agentsListPage/AgentsPage";
import Hamburger from "@/components/ui/Hamburger";

import { useEffect, useState } from "react";

const TopPageLayout = () => {
  // password protection logic-------------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedPassword = localStorage.getItem("password");
    const correctPassword = "gta6gamer";

    if (storedPassword === correctPassword) {
      setIsAuthenticated(true);
    } else {
      const password = prompt("Please enter the password:");
      if (password === correctPassword) {
        localStorage.setItem("password", password);
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password!");
      }
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-4xl text-center">Access Denied</div>
      </div>
    );
  }
  // password protection logic end-------------------------------------------------------------
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

      <AgentsPage />
    </div>
  );
};

export default TopPageLayout;
