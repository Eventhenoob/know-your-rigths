import React from "react";
import { BsSendSlash } from "react-icons/bs";
interface props {
  isVisible: boolean;
}

const ChatBox = ({ isVisible }: props) => {
  return (
    <div
      className={
        " w-screen  flex justify-center items-center  h-screen fixed z-40 top-0 left-0 " +
        (isVisible ? " block " : " hidden ")
      }
    >
      <div className="relative w-[80%] h-[80%] bg-white  rounded-xl drop-shadow-2xl">
        <div className="flex p-3  rounded-3xl justify-center items-center absolute bottom-4 bg-gray-100 w-[90%] ml-[4.5rem]">
          <input
            type="text"
            className="w-[97%] bg-transparent outline-none border-none text-2xl"
          />
          <button className=" hover:bg-white w-10 h-10 flex items-center justify-center rounded-full text-2xl">
            <BsSendSlash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
