import React from "react";
import Image from "next/image";

const ChatUI = () => {
  return (
    <div className="w-[75%]">
      <section className="w-full flex justify-center items-center  flex-col mt-5">
        <div className="">
          <p>Some more content here</p>
        </div>
        <div className="w-full flex ">
          {/* Agent in Use Section */}
          <div className="w-3/4 flex justify-end items-center gap-4 mx-auto  ">
            <span>Agent in Use:</span>
            <div className="flex border rounded-full gap-2 p-2 justify-center items-center">
              <Image
                height={20}
                width={20}
                src={"/path/to/image"}
                alt="Agent Profile Picture"
                className="rounded-full border"
              />
              <span>Sanjay Gawai</span>
              <button aria-label="Add Agent">+</button>
            </div>
          </div>

          {/* Logout Section */}
          <div className="w-2/4 flex justify-end items-center gap-4 px-4">
            <div className="flex border rounded-full gap-2 p-2 justify-end items-center">
              <Image
                height={20}
                width={20}
                src={"/path/to/another/image"} 
                alt="Shared Icon"
                className="rounded-full border"
              />
              <span>共有</span>
            </div>
          </div>
        </div>
      </section>


      <div className="w-full mt-5">
  {/* Message from Person 1 (Left-aligned) */}
  <div className="flex justify-start mb-4">
    <div className="bg-gray-200 text-black p-3 rounded-lg text-[14px] max-w-[70%]">
      Lorem ipsum dolor sit amet consectetur. Proin viverra feugiat pretium consequat in. Eget proin felis id magna et tincidunt aliquet sed eget. Eu fames ante varius purus urna.
    </div>
  </div>

  {/* Message from Person 2 (Right-aligned) */}
  <div className="flex justify-end mb-4">
    <div className="bg-blue-500 text-white p-3 rounded-lg text-[14px] max-w-[70%]">
      Lorem ipsum dolor sit amet consectetur. Proin viverra feugiat pretium consequat in. Eget proin felis id magna et tincidunt aliquet sed eget.
    </div>
  </div>

  {/* Another message from Person 1 (Left-aligned) */}
  <div className="flex justify-start mb-4">
    <div className="bg-gray-200 text-black p-3 rounded-lg text-[14px] max-w-[70%]">
      Arcu integer urna pellentesque justo tortor et nunc pulvinar. Sapien facilisis eget eu nisl viverra consequat amet arcu. Lacinia hac diam risus egestas amet. Molestie risus aliquam egestas consequat ornare.
    </div>
  </div>

  {/* Another message from Person 2 (Right-aligned) */}
  <div className="flex justify-end mb-4">
    <div className="bg-blue-500 text-white p-3 rounded-lg text-[14px] max-w-[70%]">
      Arcu integer urna pellentesque justo tortor et nunc pulvinar. Sapien facilisis eget eu nisl viverra consequat amet.
    </div>
  </div>
</div>


<div className="">
    
<input  
 type="text"
    placeholder="Type a message"
    className="border border-gray-300 w-full p-3 rounded-lg text-[14px]"

/>

</div>

    </div>
  );
};

export default ChatUI;
