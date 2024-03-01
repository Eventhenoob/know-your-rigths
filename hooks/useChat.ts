"use client";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
interface ChatResponse {
  data: string;
}
const useChat = (query: string) => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState("");
  const FetchAndSetData = (query: string) => {
    setError("");

    axios
      .post<ChatResponse>(`/api/chat`, {
        key: "H@O230Cbh@50",
        prompt:
          'suppose you are a chat bot for legal assistance and for legal and human rights kindly help the human for indian rights to resolve his issues, and be precise with the answers that will be given. say  "irrelevant Topic" if the conversation seems irrelevant' +
          query,
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data) setData(res.data.data);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return { data, error, retry: FetchAndSetData };
};

export default useChat;
