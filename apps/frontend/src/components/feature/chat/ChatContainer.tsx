import { useEffect, useState, useRef } from "react";
import { fetchStreamResponse } from "../../../services/chatApi";
import { ChatInput, ChatResponse } from "./index";

export function ChatContainer() {
  const [userInput, setUserInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const userInputRef = useRef<string>(userInput);
  const isStreamingRef = useRef<boolean>(isStreaming);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  useEffect(() => {
    userInputRef.current = userInput;
  }, [userInput]);

  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);

  useEffect(() => {
    const keyDownListener = async (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        if (isStreamingRef.current) return;
        setResponseText("");
        await fetchStreamResponse({
          setResponseText,
          setIsStreaming,
          userInput: userInputRef.current,
        });
        setUserInput("");
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        textAreaRef.current?.focus();
      }
    };

    document.addEventListener("keydown", keyDownListener);

    return () => document.removeEventListener("keydown", keyDownListener);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <ChatResponse responseText={responseText} />
      <ChatInput textAreaRef={textAreaRef} setUserInput={setUserInput} />
    </div>
  );
}
