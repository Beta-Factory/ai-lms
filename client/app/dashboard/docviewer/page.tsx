"use client";

import { MyDocument } from "@/components/pdf/PDFileExtractor";
import { Button } from "@/components/ui/button";

const DocViewer = () => {
  const handleSaveToPDF = () => {
    window.print();
  };

  return (
    <div>
      <Button onClick={handleSaveToPDF}>
        <span className="text-yellow-500 dark:text-black">save as PDF</span>
      </Button>
      <MyDocument />
    </div>
  );
};

export default DocViewer;
