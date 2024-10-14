// "use client";
// import Image from "next/image";
// import Chat from "../ui/Chat";
// import AskQuestions from "../ui/AskQuestions";

// const ChatUI = () => {
//   return (
//     <div className="lg:w-[80%] sm:w-[100%]  h-full ">
//       <section className="w-full flex justify-center items-center  flex-col mt-5  ">
//         <div className="">
//           <p className="lg:text-[14px] sm:text-[12px] font-bold ">
//             Some more content here
//           </p>
//         </div>
//         <div className="w-full flex ">
//           {/* Agent in Use Section */}
//           <div className="lg:w-3/4 xs:w-full flex justify-end items-center gap-4 mx-auto  ">
//             <span className="lg:text-[14px] sm:text-[12px] xs:text-[10px]">
//               Agent in Use:
//             </span>
//             <div className="flex border rounded-full gap-2 p-2 justify-center items-center">
//               <Image
//                 height={20}
//                 width={20}
//                 src={"/path/to/image"}
//                 alt="Agent Profile Picture"
//                 className="rounded-full border"
//               />
//               <span className="lg:text-[14px] sm:text-[12px] xs:text-[10px]">
//                 Sanjay Gawai
//               </span>
//               <button aria-label="Add Agent">
//                 <svg
//                   width="9"
//                   height="5"
//                   viewBox="0 0 9 5"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M8.46191 0.962382L4.71191 4.71238C4.65966 4.76482 4.59756 4.80643 4.52919 4.83482C4.46081 4.86321 4.38751 4.87783 4.31348 4.87783C4.23944 4.87783 4.16614 4.86321 4.09776 4.83482C4.02939 4.80643 3.9673 4.76482 3.91504 4.71238L0.165038 0.962382C0.0593661 0.85671 -1.57464e-09 0.713387 0 0.563944C1.57464e-09 0.414501 0.0593661 0.271179 0.165038 0.165507C0.27071 0.0598348 0.414033 0.000468852 0.563476 0.00046885C0.712919 0.000468849 0.856241 0.0598348 0.961913 0.165507L4.31394 3.51754L7.66598 0.165038C7.77165 0.0593663 7.91497 0 8.06441 0C8.21386 0 8.35718 0.0593663 8.46285 0.165038C8.56852 0.270711 8.62789 0.414033 8.62789 0.563476C8.62789 0.712919 8.56852 0.856241 8.46285 0.961913L8.46191 0.962382Z"
//                     fill="black"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* export or share Section */}
//           <div className="w-2/4 flex justify-end items-center gap-4 px-4">
//             <div className="flex border rounded-full gap-2 p-2 justify-end items-center">
//               <svg
//                 width="16"
//                 height="17"
//                 viewBox="0 0 16 17"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g opacity="0.7">
//                   <path
//                     d="M13.75 7.5V13.5C13.75 13.8315 13.6183 14.1495 13.3839 14.3839C13.1495 14.6183 12.8315 14.75 12.5 14.75H3.5C3.16848 14.75 2.85054 14.6183 2.61612 14.3839C2.3817 14.1495 2.25 13.8315 2.25 13.5V7.5C2.25 7.16848 2.3817 6.85054 2.61612 6.61612C2.85054 6.3817 3.16848 6.25 3.5 6.25H4.75C4.94891 6.25 5.13968 6.32902 5.28033 6.46967C5.42098 6.61032 5.5 6.80109 5.5 7C5.5 7.19891 5.42098 7.38968 5.28033 7.53033C5.13968 7.67098 4.94891 7.75 4.75 7.75H3.75V13.25H12.25V7.75H11.25C11.0511 7.75 10.8603 7.67098 10.7197 7.53033C10.579 7.38968 10.5 7.19891 10.5 7C10.5 6.80109 10.579 6.61032 10.7197 6.46967C10.8603 6.32902 11.0511 6.25 11.25 6.25H12.5C12.8315 6.25 13.1495 6.3817 13.3839 6.61612C13.6183 6.85054 13.75 7.16848 13.75 7.5ZM6.03062 5.03062L7.25 3.8125V9C7.25 9.19891 7.32902 9.38968 7.46967 9.53033C7.61032 9.67098 7.80109 9.75 8 9.75C8.19891 9.75 8.38968 9.67098 8.53033 9.53033C8.67098 9.38968 8.75 9.19891 8.75 9V3.8125L9.96937 5.0325C10.0391 5.10226 10.122 5.15761 10.2131 5.19536C10.3043 5.23312 10.402 5.25255 10.5006 5.25255C10.5993 5.25255 10.697 5.23312 10.7881 5.19536C10.8793 5.15761 10.9621 5.10226 11.0319 5.0325C11.1016 4.96273 11.157 4.87991 11.1947 4.78876C11.2325 4.69761 11.2519 4.59991 11.2519 4.50125C11.2519 4.40259 11.2325 4.30489 11.1947 4.21374C11.157 4.12259 11.1016 4.03977 11.0319 3.97L8.53187 1.47C8.4622 1.40008 8.3794 1.3446 8.28824 1.30675C8.19707 1.26889 8.09934 1.24941 8.00062 1.24941C7.90191 1.24941 7.80417 1.26889 7.71301 1.30675C7.62185 1.3446 7.53905 1.40008 7.46938 1.47L4.96938 3.97C4.89961 4.03977 4.84427 4.12259 4.80651 4.21374C4.76876 4.30489 4.74932 4.40259 4.74932 4.50125C4.74932 4.70051 4.82848 4.8916 4.96938 5.0325C5.11027 5.1734 5.30137 5.25255 5.50063 5.25255C5.69988 5.25255 5.89098 5.1734 6.03188 5.0325L6.03062 5.03062Z"
//                     fill="black"
//                   />
//                 </g>
//               </svg>

//               <span className="lg:text-[14px] sm:text-[12px] xs:text-[10px]">
//                 共有
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Chat />

//       {/* search */}

//       <AskQuestions />

//     </div>
//   );
// };

// export default ChatUI;

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { AnimatePresence, motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  handleUpload,
  selectAiChat,
} from "../../lib/features/ai-chats/ai-chat-Slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  CopyIcon,
  CornerDownLeft,
  Mic,
  Paperclip,
  RefreshCcw,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ChatAiIcons = [
  {
    icon: CopyIcon,
    label: "Copy",
  },
  {
    icon: RefreshCcw,
    label: "Refresh",
  },
  {
    icon: Volume2,
    label: "Volume",
  },
];

export default function Page() {
  const dispatch = useAppDispatch();
  const uloadedFiles = useAppSelector(selectAiChat);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      message: "Hello! How can I help you today?",
      isLoading: false,
    },
    {
      role: "user",
      message: "Can you explain how AI works?",
      isLoading: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const getMessageVariant = (role: string) =>
    role === "ai" ? "received" : "sent";

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newline in textarea
      handleSendMessage(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user's message to the messages state
    const newMessage = { role: "user", message: input, isLoading: false };
    setMessages((prev) => [...prev, newMessage]);
    setInput(""); // Clear input

    // Simulate AI response (this would be replaced with actual logic to get a response)
    setTimeout(() => {
      const aiMessage = {
        role: "ai",
        message: "This is an AI-generated response!",
        isLoading: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "text/plain": [".txt"],
      //audio
    },
    noClick: true, // Prevents automatic click on dropzone, handled manually via the SVG click
    onDrop: (acceptedFiles: any) => {
      // Combine existing files with newly accepted files
      const newFiles = [...uloadedFiles.chat.files, ...acceptedFiles];

      // Dispatch the updated array to the global state
      dispatch(handleUpload(newFiles));
    },
  });

  const formatFileSize = (size: number) => {
    return (size / 1048576).toFixed(1) + " MB"; // Convert to MB and show one decimal place
  };

  return (
    <div className="h-full w-full lg:px-10  z-0">
      <ChatMessageList ref={messagesContainerRef}>
        {/* Chat messages */}
        <AnimatePresence>
          {messages.map((message, index) => {
            const variant = getMessageVariant(message.role!);
            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: "spring",
                    bounce: 0.3,
                    duration: index * 0.05 + 0.2,
                  },
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                className="flex flex-col gap-2 p-4"
              >
                <ChatBubble key={index} variant={variant}>
                  <Avatar>
                    <AvatarImage
                      src="/path/to/image"
                      alt="Avatar"
                      className={message.role === "ai" ? "dark:invert" : ""}
                    />
                    <AvatarFallback>
                      {message.role === "ai" ? "🤖" : "GG"}
                    </AvatarFallback>
                  </Avatar>
                  <ChatBubbleMessage isLoading={message.isLoading}>
                    {message.message}
                    {message.role === "ai" && (
                      <div className="flex items-center mt-1.5 gap-1">
                        {!message.isLoading && (
                          <>
                            {ChatAiIcons.map((icon, index) => {
                              const Icon = icon.icon;
                              return (
                                <ChatBubbleAction
                                  variant="outline"
                                  className="size-6"
                                  key={index}
                                  icon={<Icon className="size-3" />}
                                  onClick={() =>
                                    console.log(
                                      "Action " +
                                        icon.label +
                                        " clicked for message " +
                                        index
                                    )
                                  }
                                />
                              );
                            })}
                          </>
                        )}
                      </div>
                    )}
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </ChatMessageList>

      <div className="flex-1" />
      <form
        ref={formRef}
        onSubmit={handleSendMessage}
        className="fixed bottom-7 lg:w-[90%] xs:w-[80%] rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring pt-2 pb-2 px-4"
        {...getRootProps()}
      >
        {" "}
        <div className="w-full flex">
          {uloadedFiles.chat.files.map((file: File) => (
            <>
              <div className="border w-[180px] p-2 rounded-full flex items-center bg-[#103F91] gap-2  justify-between mb-7">
                <div className="flex gap-2 items-center">
                  <div className=" rounded-full border w-[20px] h-[20px]  flex justify-center items-center bg-[#ffffff] ">
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_124_6)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14 4.5V11H13V4.5H11C10.6022 4.5 10.2206 4.34196 9.93934 4.06066C9.65804 3.77936 9.5 3.39782 9.5 3V1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V11H2V2C2 1.46957 2.21071 0.960859 2.58579 0.585786C2.96086 0.210714 3.46957 0 4 0L9.5 0L14 4.5ZM7.161 14.188V13.666C7.16944 13.4463 7.1295 13.2275 7.044 13.025C6.97767 12.8668 6.86553 12.732 6.722 12.638C6.58134 12.5508 6.41849 12.506 6.253 12.509C6.0868 12.5065 5.92336 12.5516 5.782 12.639C5.63976 12.7335 5.52848 12.8677 5.462 13.025C5.3765 13.2275 5.33656 13.4463 5.345 13.666V14.188C5.345 14.444 5.384 14.6577 5.462 14.829C5.52831 14.9866 5.63961 15.1213 5.782 15.216C5.92442 15.3005 6.0874 15.3441 6.253 15.342C6.41793 15.3438 6.58017 15.3002 6.722 15.216C6.86538 15.1223 6.9775 14.9879 7.044 14.83C7.12812 14.6267 7.168 14.4079 7.161 14.188ZM7.964 13.672V14.185C7.964 14.5603 7.89567 14.8847 7.759 15.158C7.62958 15.4211 7.42446 15.6394 7.17 15.785C6.916 15.929 6.61033 16.001 6.253 16.001C5.93285 16.0094 5.61596 15.935 5.333 15.785C5.07815 15.6399 4.87291 15.4214 4.744 15.158C4.60057 14.8541 4.53036 14.5209 4.539 14.185V13.672C4.539 13.2927 4.60733 12.9677 4.744 12.697C4.88067 12.423 5.07733 12.214 5.334 12.07C5.59133 11.9233 5.898 11.85 6.254 11.85C6.61067 11.85 6.916 11.9233 7.17 12.07C7.42533 12.216 7.622 12.426 7.76 12.7C7.896 12.9707 7.964 13.2947 7.964 13.672ZM1 15.925V11.926H2.459C2.865 11.926 3.2 12.0043 3.464 12.161C3.728 12.3163 3.92433 12.543 4.053 12.841C4.18367 13.1377 4.249 13.4957 4.249 13.915C4.249 14.3377 4.18367 14.699 4.053 14.999C3.92167 15.2997 3.72333 15.5293 3.458 15.688C3.194 15.846 2.861 15.925 2.459 15.925H1ZM2.354 12.571H1.79V15.278H2.353C2.53767 15.278 2.69867 15.2507 2.836 15.196C2.96772 15.1431 3.08299 15.0561 3.17 14.944C3.258 14.8307 3.32333 14.69 3.366 14.522C3.41424 14.3285 3.4371 14.1294 3.434 13.93C3.434 13.63 3.39467 13.379 3.316 13.177C3.25089 12.991 3.12652 12.8315 2.962 12.723C2.804 12.6217 2.60067 12.571 2.352 12.571H2.354ZM9.11 13.687C9.11 13.4383 9.14433 13.2273 9.213 13.054C9.27232 12.8948 9.37696 12.7564 9.514 12.656C9.65378 12.561 9.82006 12.5127 9.989 12.518C10.139 12.518 10.2717 12.5503 10.387 12.615C10.5001 12.6751 10.5945 12.765 10.66 12.875C10.7297 12.9907 10.7708 13.1213 10.78 13.256H11.545V13.183C11.5384 12.9988 11.4935 12.818 11.4133 12.652C11.3331 12.4861 11.2192 12.3386 11.079 12.219C10.9357 12.0962 10.769 12.0037 10.589 11.947C10.394 11.8802 10.1891 11.8474 9.983 11.85C9.627 11.85 9.32333 11.9243 9.072 12.073C8.822 12.221 8.63167 12.432 8.501 12.706C8.36967 12.9793 8.304 13.3053 8.304 13.684V14.182C8.304 14.5607 8.36867 14.886 8.498 15.158C8.628 15.4287 8.81833 15.6377 9.069 15.785C9.319 15.929 9.62367 16.001 9.983 16.001C10.2763 16.001 10.538 15.9463 10.768 15.837C10.998 15.7277 11.1817 15.5763 11.319 15.383C11.457 15.1844 11.5354 14.9506 11.545 14.709V14.633H10.78C10.771 14.762 10.7308 14.8869 10.663 14.997C10.5958 15.1026 10.5015 15.1882 10.39 15.245C10.2649 15.3048 10.1277 15.335 9.989 15.333C9.82019 15.3378 9.65378 15.2922 9.511 15.202C9.37414 15.1042 9.27022 14.9672 9.213 14.809C9.13957 14.6083 9.10462 14.3956 9.11 14.182V13.687ZM14.202 11.927H15.096L13.821 13.933L15.075 15.925H14.167L13.317 14.51H13.282L12.43 15.925H11.568L12.808 13.91L11.58 11.926H12.512L13.344 13.365H13.379L14.202 11.927Z"
                          fill="#114091"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_124_6">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-[#ffffff] text-[10px] font-bold">
                      {file.name}
                    </span>
                    <span className="text-[#ffffff] text-[8px]">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <div>
                  <svg
                    width="20"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_124_8)">
                      <path
                        d="M18.1875 6.375H15.6562V5.53125C15.6562 5.00911 15.4488 4.50835 15.0796 4.13913C14.7104 3.76992 14.2096 3.5625 13.6875 3.5625H10.3125C9.79036 3.5625 9.2896 3.76992 8.92038 4.13913C8.55117 4.50835 8.34375 5.00911 8.34375 5.53125V6.375H5.8125C5.58872 6.375 5.37411 6.46389 5.21588 6.62213C5.05764 6.78036 4.96875 6.99497 4.96875 7.21875C4.96875 7.44253 5.05764 7.65714 5.21588 7.81537C5.37411 7.97361 5.58872 8.0625 5.8125 8.0625H6.09375V17.625C6.09375 17.998 6.24191 18.3556 6.50563 18.6194C6.76935 18.8831 7.12704 19.0312 7.5 19.0312H16.5C16.873 19.0312 17.2306 18.8831 17.4944 18.6194C17.7581 18.3556 17.9062 17.998 17.9062 17.625V8.0625H18.1875C18.4113 8.0625 18.6259 7.97361 18.7841 7.81537C18.9424 7.65714 19.0312 7.44253 19.0312 7.21875C19.0312 6.99497 18.9424 6.78036 18.7841 6.62213C18.6259 6.46389 18.4113 6.375 18.1875 6.375ZM10.0312 5.53125C10.0312 5.45666 10.0609 5.38512 10.1136 5.33238C10.1664 5.27963 10.2379 5.25 10.3125 5.25H13.6875C13.7621 5.25 13.8336 5.27963 13.8864 5.33238C13.9391 5.38512 13.9688 5.45666 13.9688 5.53125V6.375H10.0312V5.53125ZM16.2188 17.3438H7.78125V8.0625H16.2188V17.3438ZM11.1562 10.3125V14.8125C11.1562 15.0363 11.0674 15.2509 10.9091 15.4091C10.7509 15.5674 10.5363 15.6562 10.3125 15.6562C10.0887 15.6562 9.87411 15.5674 9.71588 15.4091C9.55764 15.2509 9.46875 15.0363 9.46875 14.8125V10.3125C9.46875 10.0887 9.55764 9.87411 9.71588 9.71588C9.87411 9.55764 10.0887 9.46875 10.3125 9.46875C10.5363 9.46875 10.7509 9.55764 10.9091 9.71588C11.0674 9.87411 11.1562 10.0887 11.1562 10.3125ZM14.5312 10.3125V14.8125C14.5312 15.0363 14.4424 15.2509 14.2841 15.4091C14.1259 15.5674 13.9113 15.6562 13.6875 15.6562C13.4637 15.6562 13.2491 15.5674 13.0909 15.4091C12.9326 15.2509 12.8438 15.0363 12.8438 14.8125V10.3125C12.8438 10.0887 12.9326 9.87411 13.0909 9.71588C13.2491 9.55764 13.4637 9.46875 13.6875 9.46875C13.9113 9.46875 14.1259 9.55764 14.2841 9.71588C14.4424 9.87411 14.5312 10.0887 14.5312 10.3125Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_124_8"
                        x="0.96875"
                        y="0.5625"
                        width="22.0625"
                        height="23.4688"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_124_8"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_124_8"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </>
          ))}
        </div>
        <ChatInput
          ref={inputRef}
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <input {...getInputProps()} />
        <div className="flex items-center p-3 pt-0">
          <Button variant="ghost" size="icon" onClick={open}>
            <Paperclip className="size-4" />
            <span className="sr-only">Attach file</span>
          </Button>

          <Button variant="ghost" size="icon">
            <Mic className="size-4" />
            <span className="sr-only">Use Microphone</span>
          </Button>

          <Button
            disabled={!input || isLoading}
            type="submit"
            size="sm"
            className="ml-auto gap-1.5"
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
