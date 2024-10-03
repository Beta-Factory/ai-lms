import React from "react";
import Image, { StaticImageData } from "next/image";

interface AgentCardProps {
  name: string;
  description: string;
  imageUrl: StaticImageData;
}

const AgentCard = ({ name, description, imageUrl }: AgentCardProps) => {
  return (
    <>
      <div className="lg:w-1/2 xs:w-full  flex justify-center items-center gap-3 border rounded-xl px-[32px] py-[24px] bg-[#F5F5F5]">
        <Image
          className="h-[124px] w-[124px] border text-[#000000] rounded-full p-1 object-cover"
          src={imageUrl} // Agent Image URL
          alt="description of the image"
        />

        <div className="flex flex-col text-lg">
          <span className="text-[#000000]">{name}</span> {/* Agent Name */}
          <span className="text-[#808080]">
            {description} {/*   Agent Description */}
          </span>
        </div>
      </div>
    </>
  );
};

export default AgentCard;
