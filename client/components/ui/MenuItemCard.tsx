import Link from "next/link";
import React, { FC } from "react";
import { SheetClose } from "./sheet";

interface MenuItemCardProps {
  name: string;
  menuIcon: React.JSX.Element;
  link: string;
}

const MenuItemCard: FC<MenuItemCardProps> = ({ name, menuIcon, link }) => {
  const handleMobileMenuClick = () => {
    // document.getElementById("main-page")?.click();
    SheetClose({ type: "reset" });
  };

  return (
    <div className="flex justify-center px-4 mt-2 mb-2">
      <Link
        className="flex flex-row justify-start gap-2 border bg-[#EEEEF1] py-2 px-3 rounded-lg w-[65%]"
        onClick={handleMobileMenuClick}
        href={link}
      >
        {menuIcon}
        <span className="text-[#808080] text-[15px]">{name}</span>
      </Link>
    </div>
  );
};

export default MenuItemCard;
