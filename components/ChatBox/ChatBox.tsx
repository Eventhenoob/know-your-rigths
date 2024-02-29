"use client";
import useChat from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { BsSendSlash } from "react-icons/bs";
interface props {
  isVisible: boolean;
}

const ChatBox = ({ isVisible }: props) => {
  const { data, error, retry } = useChat("");
  const [prompt, setPrompt] = useState("");
  const conversition: string[] = [];
  const [isFetching, setIsFatching] = useState(false);

  useEffect(() => {
    if (data) {
      conversition.push(data);
      setIsFatching(false);
    }
  }, [data]);

  return (
    <div
      className={
        " w-screen  flex justify-center items-center  h-screen fixed z-40 top-0 left-0 " +
        (isVisible ? " block " : " hidden ")
      }
    >
      <div className="relative w-[80%] h-[80%] bg-white  rounded-xl drop-shadow-2xl">
        <div className="flex flex-col-reverse w-[90%] h-[90%] mb-20 overflow-y-scroll"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!isFetching) {
              console.log("Here");
              retry(prompt);
              setIsFatching(true);
            }
          }}
          className="flex p-3  rounded-3xl justify-center items-center absolute bottom-4 bg-gray-100 w-[90%] ml-[4.5rem]"
        >
          <input
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="w-[97%] bg-transparent outline-none border-none text-2xl"
          />
          <button
            type="submit"
            className=" hover:bg-white w-10 h-10 flex items-center justify-center rounded-full text-2xl"
          >
            <BsSendSlash />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
