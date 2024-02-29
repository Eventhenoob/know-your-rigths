"use client";
import useChat from "@/hooks/useChat";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsSendSlash } from "react-icons/bs";
import { signIn } from "next-auth/react";
interface props {
  isVisible: boolean;
}

const ChatBox = ({ isVisible }: props) => {
  const { status } = useSession();
  const { data, error, retry } = useChat("");
  const [prompt, setPrompt] = useState("");
  const [conversition, setConversition] = useState<string[]>([]);
  const [isFetching, setIsFatching] = useState(false);

  useEffect(() => {
    if (data) {
      setConversition([data, ...conversition]);
      setIsFatching(false);
    }
  }, [data]);

  return (
    <>
      status === "authenticated" ? (
      <div
        className={
          " w-screen  flex justify-center items-center  h-screen fixed z-40 top-0 left-0 " +
          (isVisible ? " block " : " hidden ")
        }
      >
        <div className="relative w-[80%] h-[80%] bg-white  rounded-xl drop-shadow-2xl">
          <div className="flex  flex-col-reverse w-[100%] h-[90%] mb-20 overflow-y-scroll p-10">
            {conversition.map((msg, i) => {
              return (
                <p
                  key={i}
                  className={
                    "p-3 rounded-3xl  mb-3 " +
                    (msg.endsWith("^")
                      ? "bg-gray-100 ml-auto"
                      : "bg-[#000435] text-white mr-auto")
                  }
                >
                  {msg.slice(0, -1)}
                </p>
              );
            })}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isFetching) {
                retry(prompt);

                setConversition([prompt + "^", ...conversition]);
                setPrompt("");
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
      ) : (
      <div
        onClick={() => {
          signIn();
        }}
        className={
          " w-screen  flex justify-center  items-center  h-screen fixed z-40 top-0 left-0 " +
          (isVisible ? " block " : " hidden ")
        }
      >
        Please LogIn
      </div>
      )
    </>
  );
};

export default ChatBox;
