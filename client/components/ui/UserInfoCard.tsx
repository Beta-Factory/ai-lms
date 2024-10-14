import React from "react";

const UserInfoCard = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center mt-3 border gap-5 w-[90%] rounded-lg p-1">
        <div className="w-[30px] h-[30px] rounded-lg bg-[#808080]"></div>
        <div className="flex flex-col">
          <p className="text-[#808080] text-[15px] font-bold">John Doe</p>
          <p className="text-[#808080] text-[10px]">
            sanjaygawai2022@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
