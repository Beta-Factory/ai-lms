import React from "react";
import { Card } from "../ui/card";
import Profile from "../userImageUploader/Profile";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UserProfileSettings = () => {
  return (
    <div className="flex justify-center items-center w-full max-md:mt-5">
      <Card className="flex flex-col w-[60%] max-md:w-full gap-0 ">
        <h1 className="flex text-2xl font-bold text-center mt-5 ml-5 items-start">
          User Settings
        </h1>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-10 p-10 w-full">
          <div className="w-auto h-auto flex-shrink-0">
            <Profile />
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-5">
              <Input
                type="text"
                placeholder="Change Name"
                className="border-2 flex-grow"
              />
              <Button className="bg-sky-500 text-white lg:hover:bg-green-500">
                Save
              </Button>
            </div>
            <div className="flex flex-row gap-5">
              <Input
                type="text"
                placeholder="Change Username"
                className="border-2 flex-grow"
              />
              <Button className="bg-sky-500 text-white lg:hover:bg-green-500">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfileSettings;
