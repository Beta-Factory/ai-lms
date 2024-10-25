import React from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SelectedAgent = () => {
  const selectedAgent = 'AI Agent Name'; // You can dynamically set this based on the selected agent

  const router = useRouter();

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
    <div className="flex items-center justify-between p-4 text-white ">
      {/* Navbar */}
      <div className="flex items-center rounded-lg dark:border-white  border  justify-around p-1 gap-2">
        <span className='rounded-full dark:border-white border w-8 h-8 '></span>
        <span className="text-[16px] dark:text-white  text-black ">{selectedAgent}</span>
      </div>

      {/* Export Chat Button */}
      <div>
      <Button className='bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-violet-300 ... ' onClick={handleExportPDF}>
            <span className="text-white dark:text-black ">export PDF</span>
          </Button>
      </div>
    </div>
  );
};

export default SelectedAgent;
