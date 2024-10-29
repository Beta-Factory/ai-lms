/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  CopyIcon,
  CornerDownLeft,
  Edit,
  Mic,
  Paperclip,
  RefreshCcw,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  addMessage,
  handleUpload,
  selectAiChatFiles,
  selectAiChatMessages,
} from "../../lib/features/ai-chats/ai-chat-Slice";

import ChatEditorModal from "../chatEditor/chatEditorModal";

import SelectedAgent from "../ui/chat/selectedAgent";

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
  {
    icon: Edit,
    label: "Edit",
  },
];

interface SelectedMessage {
  index: number;
  message: Message;
}

export default function Page() {
  const dispatch = useAppDispatch();
  const uloadedFiles = useAppSelector(selectAiChatFiles);
  const InitialMessages = useAppSelector(selectAiChatMessages);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<SelectedMessage | null>(null);
  const [input, setInput] = useState("");
  // const [isLoading, setisLoading] = useState(false);

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
    setMessages(InitialMessages);
  }, [messages, InitialMessages]);

  const handleEditClick = (message: Message, index: number) => {
    const newSelectedMessage = { index, message };
    setSelectedMessage(newSelectedMessage);
    setShowModal(true);
  };

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
    const newMessage: Message = {
      role: "user",
      message: input,
      isLoading: false,
    };
    // setMessages((prev) => [...prev, newMessage]);
    dispatch(addMessage(newMessage));
    setInput(""); // Clear input

    // Simulate AI response (this would be replaced with actual logic to get a response)
    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        message: "This is an AI-generated response!",
        isLoading: false,
      };
      // setMessages((prev) => [...prev, aiMessage]);
      dispatch(addMessage(aiMessage));
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
      const newFiles = [...uloadedFiles, ...acceptedFiles];

      // Dispatch the updated array to the global state
      dispatch(handleUpload(newFiles));
    },
  });

  const formatFileSize = (size: number) => {
    return (size / 1048576).toFixed(1) + " MB"; // Convert to MB and show one decimal place
  };

  return (
    <div className="h-full w-full lg:px-10 md:px-10 pb-[200px] lg:ml-10">
      <SelectedAgent />
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
                      {/* to add logic so that it takes username initialsinstead of GG */}
                      {message.role === "ai" ? "🤖" : "GG"}
                    </AvatarFallback>
                  </Avatar>
                  <ChatBubbleMessage isLoading={message.isLoading}>
                    {message.message}
                    {message.role === "ai" && (
                      <div className="flex items-center mt-1.5 gap-1">
                        {!message.isLoading && (
                          <>
                            {ChatAiIcons.map((icon, idx) => {
                              const Icon = icon.icon;

                              return (
                                <ChatBubbleAction
                                  variant="outline"
                                  className="size-6"
                                  key={idx}
                                  icon={<Icon className="size-3" />}
                                  onClick={() => {
                                    if (icon.label === "Edit") {
                                      handleEditClick(message, index);
                                    }
                                    console.log(
                                      icon.label +
                                        " clicked for message " +
                                        index,
                                      message
                                    );
                                  }}
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

      <form
        ref={formRef}
        onSubmit={handleSendMessage}
        className="fixed bottom-7 lg:w-[80%] xs:w-[80%] rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring pt-2 pb-2 px-4"
        {...getRootProps()}
      >
        <div className="w-full flex gap-3">
          {uloadedFiles.map((file: File) => (
            <>
              <div className="border w-[200px] p-2 rounded flex items-center bg-[#103F91] gap-2  justify-between mb-7 relative  ">
                <div className="flex gap-2 items-center">
                  <div className=" rounded border w-[20px] h-[20px]  flex justify-center items-center bg-[#ffffff] ">
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
                    <span className="text-[#ffffff] text-[10px] font-bold breal-all">
                      {file.name}
                    </span>
                    <span className="text-[#ffffff] text-[8px]">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <div className="absolute top-[-15px] right-[-10px]   cursor-pointer " >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="24" height="24" rx="12" fill="white"/>
<rect x="0.5" y="0.5" width="25" height="25" rx="12.5" stroke="black" stroke-opacity="0.1"/>
<path d="M17.9501 8.50001H15.7001V8.05001C15.7001 7.69197 15.5579 7.34859 15.3047 7.09542C15.0515 6.84224 14.7081 6.70001 14.3501 6.70001H11.6501C11.2921 6.70001 10.9487 6.84224 10.6955 7.09542C10.4423 7.34859 10.3001 7.69197 10.3001 8.05001V8.50001H8.0501C7.93075 8.50001 7.81629 8.54742 7.7319 8.63181C7.64751 8.71621 7.6001 8.83066 7.6001 8.95001C7.6001 9.06936 7.64751 9.18382 7.7319 9.26821C7.81629 9.3526 7.93075 9.40001 8.0501 9.40001H8.5001V17.5C8.5001 17.7387 8.59492 17.9676 8.7637 18.1364C8.93248 18.3052 9.1614 18.4 9.4001 18.4H16.6001C16.8388 18.4 17.0677 18.3052 17.2365 18.1364C17.4053 17.9676 17.5001 17.7387 17.5001 17.5V9.40001H17.9501C18.0694 9.40001 18.1839 9.3526 18.2683 9.26821C18.3527 9.18382 18.4001 9.06936 18.4001 8.95001C18.4001 8.83066 18.3527 8.71621 18.2683 8.63181C18.1839 8.54742 18.0694 8.50001 17.9501 8.50001ZM12.1001 15.25C12.1001 15.3694 12.0527 15.4838 11.9683 15.5682C11.8839 15.6526 11.7694 15.7 11.6501 15.7C11.5308 15.7 11.4163 15.6526 11.3319 15.5682C11.2475 15.4838 11.2001 15.3694 11.2001 15.25V11.65C11.2001 11.5307 11.2475 11.4162 11.3319 11.3318C11.4163 11.2474 11.5308 11.2 11.6501 11.2C11.7694 11.2 11.8839 11.2474 11.9683 11.3318C12.0527 11.4162 12.1001 11.5307 12.1001 11.65V15.25ZM14.8001 15.25C14.8001 15.3694 14.7527 15.4838 14.6683 15.5682C14.5839 15.6526 14.4694 15.7 14.3501 15.7C14.2308 15.7 14.1163 15.6526 14.0319 15.5682C13.9475 15.4838 13.9001 15.3694 13.9001 15.25V11.65C13.9001 11.5307 13.9475 11.4162 14.0319 11.3318C14.1163 11.2474 14.2308 11.2 14.3501 11.2C14.4694 11.2 14.5839 11.2474 14.6683 11.3318C14.7527 11.4162 14.8001 11.5307 14.8001 11.65V15.25ZM14.8001 8.50001H11.2001V8.05001C11.2001 7.93066 11.2475 7.81621 11.3319 7.73181C11.4163 7.64742 11.5308 7.60001 11.6501 7.60001H14.3501C14.4694 7.60001 14.5839 7.64742 14.6683 7.73181C14.7527 7.81621 14.8001 7.93066 14.8001 8.05001V8.50001Z" fill="#AE2727"/>
</svg>

                </div>
              </div>
            </>
          ))}
          {showModal && (
            <ChatEditorModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Edit This Message"
            >
              {selectedMessage!}
            </ChatEditorModal>
          )}
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

          {/* <PDFDownloadLink document={<MyDocument />} fileName="chat.pdf">
            <Button>
              <span className="text-white dark:text-black">export PDF</span>
            </Button>
          </PDFDownloadLink> */}

          <Button
            // disabled={!input || isLoading}
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
