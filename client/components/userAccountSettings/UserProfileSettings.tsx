"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import Profile from "../userImageUploader/Profile";

const UserProfileSettings = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [namealert, setNamealert] = useState("");
  const [usernamealert, setUserNamealert] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.value;
    setName(nameInput);
    if (nameInput) {
      const alphanumericRegex = /^[a-z0-9 ]+$/i;
      if (!alphanumericRegex.test(nameInput)) {
        setNamealert("Name can only contain alphanumeric characters.");
      } else {
        setNamealert("");
      }
    }
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userNameInput = e.target.value;
    setUsername(userNameInput);
    if (userNameInput) {
      const alphanumericRegex = /^[^\s-]+$/;
      if (!alphanumericRegex.test(userNameInput)) {
        setUserNamealert("UserName can't contain spaces or hyphen.");
      } else {
        setUserNamealert("");
      }
    }
  }; // handle name change

  const handleUsernameSave = () => {}; // handle username save
  const handleNameSave = () => {}; // handle name save

  return (
    <div className="flex justify-center items-center w-full max-md:mt-5">
      <Card className="flex flex-col max-md:w-full gap-0 w-full mt-10">
        <h1 className="flex text-2xl font-bold text-center mt-5 ml-5 items-start">
          User Settings
        </h1>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-10 p-10 w-full">
          {/* profile image and data */}
          <div className="w-auto h-auto flex-shrink-0">
            <Profile />
          </div>

          <div className="flex flex-col gap-10 w-[70%]">
            <div className="flex flex-row gap-5 max-md:flex-col">
              <Input
                type="text"
                placeholder="Change Name"
                value={name}
                className="border-2 flex-grow"
                onChange={handleNameChange}
              />
              <Button
                onClick={handleNameSave}
                className="bg-sky-500 text-white lg:hover:bg-green-500"
                disabled={namealert.length > 0 || !name}
              >
                Save
              </Button>
            </div>
            <div className="flex flex-row gap-5 max-md:flex-col">
              <Input
                type="text"
                placeholder="Change Username"
                value={username}
                className="border-2 flex-grow"
                onChange={handleUserNameChange}
              />
              <Button
                onClick={handleUsernameSave}
                className="bg-sky-600 text-white lg:hover:bg-green-500"
                disabled={usernamealert.length > 0 || !username}
              >
                Save
              </Button>
            </div>
            <div className="text-red-400">
              {namealert && <p>{namealert}</p>}
            </div>
            <div className="text-red-400">
              {usernamealert && <p>{usernamealert}</p>}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfileSettings;
