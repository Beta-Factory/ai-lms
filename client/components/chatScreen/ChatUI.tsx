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
import ChatFilePreviewer from "./chatFilePreviewer";
import { ChatUtilsInput } from "./newChatUtils";

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
        <div className="w-full flex">
          {uloadedFiles.map((file: File) => (
            <ChatFilePreviewer key={file.name} file={file} />
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
        {/* <ChatUtilsInput value={input} placeholder="Type your message here..." /> */}
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
