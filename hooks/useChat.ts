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
        prompt: query,
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
