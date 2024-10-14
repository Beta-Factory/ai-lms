import React from "react";

const MenuItemCard = ({
  name,
  menuIcon,
}: {
  name: string;
  menuIcon: React.JSX.Element;
}) => {
  return (
    <div className="flex justify-center px-4 mt-2 mb-2">
      <div className="flex flex-row justify-start gap-2 border bg-[#EEEEF1] py-2 px-3 rounded-lg w-[65%]">
        {menuIcon}
        <p className="text-[#808080] text-[15px]">{name}</p>
      </div>
    </div>
  );
};

export default MenuItemCard;
