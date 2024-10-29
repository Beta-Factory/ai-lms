"use client";

import { useTranslation } from "react-i18next";
// import { Sidebar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./button";

import { useRouter } from "next/navigation";

const AgentsTopPage = () => {
  const router = useRouter();

  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const creditLimit = 100; // Define the total credit limit
  const remainingCredits = 70; // Example value of remaining credits

  // Calculate the percentage of remaining credits
  const remainingPercentage = (remainingCredits / creditLimit) * 100;

  return (
    <div className="w-full">
      <div className="w-full flex justify-end mt-5 gap-5">
        {/* Credit Limit Display with Progress Bar */}
        <div className="flex flex-col items-start w-[200px]">
          <span className="text-black dark:text-white font-medium mb-1">
            {t("credits remaining")}: {remainingCredits}/{creditLimit}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${remainingPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={() => router.push("/dashboard/create-agent")}
          className="bg-black dark:bg-white px-3 rounded-2xl flex items-center gap-1"
        >
          <span>+ {"create"}</span>
        </Button>

        {/* Language change buttons */}
        <Select onValueChange={(value) => handleChangeLanguage(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("change language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="jp">Japanese / 日本語</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-[100%] text-[30px] font-bold text-[#000000] dark:text-white flex items-center justify-center mt-5">
        {t("header.message")}
      </div>
      <div className="w-[100%] sm:h-[100px] rounded border text-[#000000] dark:text-white shadow-lg  flex justify-center items-center text-center lg:px-[130px] mt-4">
        {t("home.body")}
      </div>

      {/* search */}
      <div className="w-[100%] mt-5 flex justify-center items-center">
        <div className="border-none bg-[#F5F5F5] text-[#000000] dark:text-white flex justify-center items-center px-5 rounded-2xl gap-2">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.7">
              <path
                d="M14.5306 13.9694L11.5625 11C12.4524 9.84033 12.8679 8.38553 12.7247 6.93075C12.5814 5.47597 11.8902 4.13014 10.7911 3.16628C9.69209 2.20242 8.26757 1.69269 6.80654 1.74051C5.34551 1.78833 3.95736 2.3901 2.9237 3.42376C1.89004 4.45742 1.28827 5.84557 1.24045 7.3066C1.19263 8.76764 1.70236 10.1922 2.66622 11.2912C3.63008 12.3902 4.97591 13.0815 6.43069 13.2247C7.88547 13.368 9.34027 12.9525 10.5 12.0625L13.4706 15.0338C13.5404 15.1036 13.6232 15.1589 13.7143 15.1966C13.8055 15.2344 13.9032 15.2538 14.0019 15.2538C14.1005 15.2538 14.1982 15.2344 14.2894 15.1966C14.3805 15.1589 14.4633 15.1036 14.5331 15.0338C14.6029 14.964 14.6582 14.8812 14.696 14.79C14.7337 14.6989 14.7532 14.6012 14.7532 14.5025C14.7532 14.4039 14.7337 14.3062 14.696 14.215C14.6582 14.1239 14.6029 14.0411 14.5331 13.9713L14.5306 13.9694ZM2.74998 7.50004C2.74998 6.65947 2.99923 5.83777 3.46623 5.13886C3.93323 4.43995 4.59698 3.89522 5.37357 3.57355C6.15016 3.25188 7.00469 3.16771 7.82911 3.3317C8.65353 3.49569 9.41081 3.90046 10.0052 4.49483C10.5996 5.08921 11.0043 5.84648 11.1683 6.6709C11.3323 7.49532 11.2481 8.34986 10.9265 9.12644C10.6048 9.90303 10.0601 10.5668 9.36115 11.0338C8.66224 11.5008 7.84055 11.75 6.99998 11.75C5.87316 11.7489 4.79283 11.3007 3.99605 10.504C3.19927 9.70718 2.75113 8.62685 2.74998 7.50004Z"
                fill="black"
              />
            </g>
          </svg>

          <input
            type="text"
            placeholder="Search all agents"
            className="border-none bg-[#F5F5F5] text-[#000000] outline-none text-[15px] py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AgentsTopPage;
