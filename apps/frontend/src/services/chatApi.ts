import { Dispatch, SetStateAction } from "react";

interface IfetchStreamResponse {
  setResponseText: Dispatch<SetStateAction<string>>;
  setIsStreaming: Dispatch<SetStateAction<boolean>>;
  userInput: string;
}

export const fetchStreamResponse = async ({
  setResponseText,
  setIsStreaming,
  userInput,
}: IfetchStreamResponse): Promise<string | undefined> => {
  let resText = "";

  try {
    setIsStreaming(true);

    const res = await fetch("http://localhost:3000/anthropic/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userInput,
      }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No reader available");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);

      const lines = chunk.split("\n\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const eventData = line.substring(6);

          if (eventData === "[DONE]") {
            break;
          }

          try {
            const parsedData = JSON.parse(eventData);
            if (parsedData.text) {
              // update the text as soon as it arrives
              setResponseText((current) => current + parsedData.text);
              resText += parsedData.text;
            }
          } catch (e) {
            console.error("Error parsing SSE data:", e);
          }
        }
      }
    }

    return resText;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    setResponseText(errorMessage);
  } finally {
    setIsStreaming(false);
  }
};
