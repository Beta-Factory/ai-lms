"use client";

import { MyDocument } from "@/components/pdf/PDFileExtractor";
import { Button } from "@/components/ui/button";
import { selectAiEXChatMessages } from "@/lib/features/ai-export-chat/ai-export-chat-Slice";
import { useAppSelector } from "@/lib/hooks";
import { use, useEffect, useState } from "react";

const DocViewer = () => {
  const handleSaveToPDF = () => {
    window.print();
  };

  // let document: SelectedMessage | null = null;
  let storedDocument = useAppSelector(selectAiEXChatMessages);
  console.log("storedDocument from DocViewer", storedDocument); // ! Debugging
  useEffect(() => {
    console.log("storedDocument from DocViewer useEffect", storedDocument); // ! Debugging
  }, [storedDocument]);

  return (
    <div>
      <Button onClick={handleSaveToPDF}>
        <span className="text-yellow-500 dark:text-black">save as PDF</span>
      </Button>
      <MyDocument document={storedDocument} />
    </div>
  );
};

export default DocViewer;
