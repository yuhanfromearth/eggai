import { Dispatch, SetStateAction } from "react";

interface IChatInput {
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
  setUserInput: Dispatch<SetStateAction<string>>;
}
export function ChatInput({ textAreaRef, setUserInput }: IChatInput) {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
  };

  return (
    <textarea
      ref={textAreaRef}
      className="w-3/5 text-black text-center p-4 min-h-fit outline-none resize-none overflow-hidden"
      placeholder="Start typing..."
      onInput={handleInput}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
      }}
    ></textarea>
  );
}
