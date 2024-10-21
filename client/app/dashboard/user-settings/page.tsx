"use client";
import UserAccountDeletion from "@/components/userAccountSettings/UserAccountDeletion";
import UserPasswordSettings from "@/components/userAccountSettings/UserPasswordSettings";
import UserProfileSettings from "@/components/userAccountSettings/UserProfileSettings";

const Page = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col w-[70%] gap-10 mb-10">
        <UserProfileSettings />
        <UserPasswordSettings />
        <UserAccountDeletion />
      </div>
    </div>
  );
};

export default Page;
