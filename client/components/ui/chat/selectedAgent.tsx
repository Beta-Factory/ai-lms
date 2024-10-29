import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SelectedAgent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("AI Agent Name");
  const agentOptions = [
    "AI Agent Name",
    "Agent Smith",
    "Agent Johnson",
    "Agent 47",
  ]; // Add more agent names as needed

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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectAgent = (agent) => {
    setSelectedAgent(agent);
    setIsDropdownOpen(false); // Close dropdown after selecting an agent
  };

  return (
    <div className="flex items-center justify-between p-4 text-white">
      {/* Navbar */}
      <div className="relative flex items-center rounded-lg border dark:bg-[#808080] bg-white dark:text-black justify-around p-1 gap-2">
        <span className="rounded-full border dark:border-white  border-black w-8 h-8"></span>
        <span className="text-[16px] dark:text-white text-black">
          {selectedAgent}
        </span>

        {/* Dropdown Icon */}
        <svg
          width="9"
          height="5"
          viewBox="0 0 9 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleDropdown}
          className="cursor-pointer text-black dark:text-white"
        >
          <path
            d="M8.46191 0.962382L4.71191 4.71238C4.65966 4.76482 4.59756 4.80643 4.52919 4.83482C4.46081 4.86321 4.38751 4.87783 4.31348 4.87783C4.23944 4.87783 4.16614 4.86321 4.09776 4.83482C4.02939 4.80643 3.9673 4.76482 3.91504 4.71238L0.165038 0.962382C0.0593661 0.85671 -1.57464e-09 0.713387 0 0.563944C1.57464e-09 0.414501 0.0593661 0.271179 0.165038 0.165507C0.27071 0.0598348 0.414033 0.000468852 0.563476 0.00046885C0.712919 0.000468849 0.856241 0.0598348 0.961913 0.165507L4.31394 3.51754L7.66598 0.165038C7.77165 0.0593663 7.91497 0 8.06441 0C8.21386 0 8.35718 0.0593663 8.46285 0.165038C8.56852 0.270711 8.62789 0.414033 8.62789 0.563476C8.62789 0.712919 8.56852 0.856241 8.46285 0.961913L8.46191 0.962382Z"
            fill="currentColor"
          />
        </svg>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-10 left-0 mt-2 w-40 dark:bg-[#808080] bg-white rounded-lg shadow-lg py-2 z-10">
            {agentOptions.map((agent) => (
              <div
                key={agent}
                onClick={() => selectAgent(agent)}
                className="px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
              >
                {agent}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export Chat Button */}
      <div>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-violet-300"
          onClick={handleExportPDF}
        >
          <span className="text-white dark:text-black">export PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default SelectedAgent;
