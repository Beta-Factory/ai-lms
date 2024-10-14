"use client";
import UserPasswordSettings from "@/components/userAccountSettings/UserPasswordSettings";
import UserProfileSettings from "@/components/userAccountSettings/UserProfileSettings";

const Page = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-10 w-full">
        <UserProfileSettings />
        <UserPasswordSettings />
      </div>
    </div>
  );
};

export default Page;
