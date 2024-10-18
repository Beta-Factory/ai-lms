"use client";

import ChatUI from "@/components/chatScreen/ChatUI";
import { MyDocument } from "@/components/pdf/PDFileExtractor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ChatUIPage = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const handleExportPDF = async () => {
    try {
      // Call your PDF generation function here if needed
      // MyDocument();

      // Navigate to /docviewer
      router.push("/dashboard/docviewer");
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  return (
    <>
      <div>
        <Button onClick={handleExportPDF}>
          <span className="text-white dark:text-black">export PDF</span>
        </Button>

        <div className="flex flex-row max-md:flex-col gap-10 w-full">
          <ChatUI />
        </div>
      </div>
    </>
  );
};
export default ChatUIPage;
