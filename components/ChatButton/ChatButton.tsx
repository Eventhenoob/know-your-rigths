"use client";
import style from "./style.module.css";
import { BsChatText } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
interface Props {
  toggleChatbox: () => void;
  isVisible: boolean;
}

const ChatButton = ({ toggleChatbox, isVisible }: Props) => {
  return (
    <button
      onClick={toggleChatbox}
      className={
        "cursor-pointer drop-shadow-2xl hover:scale-110 transition-all duration-300 z-50 fixed bottom-8 right-10 rounded-full h-20 w-20 text-5xl flex justify-center items-center bg-white " +
        (!isVisible && style["logo"])
      }
    >
      {!isVisible ? <BsChatText /> : <IoClose />}
    </button>
  );
};

export default ChatButton;
