import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Share2 } from "lucide-react"; // Importing the Share icon
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"; // Importing Social Media Icons

interface AgentCardProps {
  name: string;
  description: string;
  imageUrl: StaticImageData;
}

const AgentCard = ({ name, description, imageUrl }: AgentCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control delete modal visibility
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // State to control share modal visibility

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true); // Open the delete modal on cross button click
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete modal
  };

  const handleConfirmDelete = () => {
    console.log("Deleted");
    setIsDeleteModalOpen(false); // Close the delete modal after confirming delete
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true); // Open the share modal on share button click
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false); // Close the share modal
  };

  return (
    <>
      <div className="relative group lg:w-1/2 xs:w-full flex justify-center items-center gap-3 border rounded-xl px-[32px] py-[24px] bg-[#F5F5F5] max-md:flex-col">
        {/* Cross Button */}
        <button
          className="lg:hidden lg:group-hover:flex absolute top-1 right-2 text-gray-500 hover:text-gray-700 focus:outline-none text-[30px]"
          onClick={handleDeleteClick} // Open the delete modal on click
        >
          &times;
        </button>

        {/* Agent Image */}
        <Image
          className="h-[124px] w-[124px] border text-[#000000] rounded-full p-1 object-cover"
          src={imageUrl}
          alt="Agent Image"
          width={124}
          height={124}
        />

        {/* Agent Info */}
        <div className="flex flex-col text-lg">
          <span className="text-[#000000]">{name}</span> {/* Agent Name */}
          <span className="text-[#808080]">
            {description} {/* Agent Description */}
          </span>
        </div>

        {/* Share Icon */}
        <Share2
          className="lg:hidden lg:group-hover:flex absolute bottom-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          size={24}
          onClick={handleShareClick} // Open the share modal on click
        />
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              Do you want to delete this?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Share this agent</h2>
            <div className="flex justify-around">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook
                  className="text-blue-600 hover:text-blue-800"
                  size={32}
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter
                  className="text-blue-400 hover:text-blue-600"
                  size={32}
                />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  className="text-blue-700 hover:text-blue-900"
                  size={32}
                />
              </a>
              <a href="mailto:?subject=Check out this agent&body=Here is the agent I wanted to share with you.">
                <Mail className="text-gray-600 hover:text-gray-800" size={32} />
              </a>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={handleCloseShareModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentCard;
