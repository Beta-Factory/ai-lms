/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import Modal from "./Modal";
import PencilIcon from "./PencilIcon";

const Profile = () => {
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);

  // const [name, setName] = useState("Parwez"); // ! to be queried from the database

  // // ! to be queried from the database : Prime user, Regular user, pro user, etc.
  // const [userType, setUserType] = useState("prime user");

  const updateAvatar = (imgSrc: any) => {
    avatarUrl.current = imgSrc;
  };

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>
      <h2 className="text-black font-bold mt-6 dark:text-white">Parwez</h2>
      {/* <h2 className="text-black font-bold mt-6">{name}</h2> */}
      <p className="text-orange-400 text-sm mt-2 font-semibold">prime user</p>
      {/* <p className="text-gray-500 text-xs mt-2">{userType}</p> */}
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
