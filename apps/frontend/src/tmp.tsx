// import { useEffect, useState, useRef } from "react";
// import { fetchStreamResponse } from "./services/chatApi";

// export default function ChatContainer() {
//   const [userInput, setUserInput] = useState("");
//   const [responseText, setResponseText] = useState("");
//   const [isStreaming, setIsStreaming] = useState(false);

//   const textAreaRef = useRef<HTMLTextAreaElement>(null);
//   const userInputRef = useRef<string>(userInput);
//   const isStreamingRef = useRef<boolean>(isStreaming);

//   useEffect(() => {
//     textAreaRef.current?.focus();
//   }, []);

//   useEffect(() => {
//     userInputRef.current = userInput;
//   }, [userInput]);

//   useEffect(() => {
//     isStreamingRef.current = isStreaming;
//   }, [isStreaming]);

//   useEffect(() => {
//     const keyDownListener = async (event: KeyboardEvent) => {
//       if (event.key === "Enter" && !event.shiftKey) {
//         console.log("hit");
//         if (isStreamingRef.current) return;
//         setResponseText("");
//         console.log(userInputRef.current);
//         await fetchStreamResponse({
//           setResponseText,
//           setIsStreaming,
//           userInput: userInputRef.current,
//         });
//         setUserInput("");
//       }

//       if ((event.metaKey || event.ctrlKey) && event.key === "k") {
//         textAreaRef.current?.focus();
//       }
//     };

//     document.addEventListener("keydown", keyDownListener);

//     return () => document.removeEventListener("keydown", keyDownListener);
//   }, []);

//   return (
//     <div className="w-screen h-screen flex flex-col justify-center items-center">
//       <div className="bg-green-200">{responseText}</div>
//       <textarea
//         ref={textAreaRef}
//         className="bg-red-200 w-3/5 text-black text-center p-4 min-h-fit outline-none resize-none overflow-hidden"
//         placeholder="Start typing..."
//         onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
//           const target = e.target as HTMLTextAreaElement;
//           target.style.height = "auto";
//           target.style.height = target.scrollHeight + "px";
//         }}
//         onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
//           setUserInput(e.target.value);
//         }}
//       ></textarea>
//     </div>
//   );
// }
