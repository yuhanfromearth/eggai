interface ChatResponseI {
  responseText: string;
}

export function ChatResponse({ responseText }: ChatResponseI) {
  return <span>{responseText}</span>;
}
