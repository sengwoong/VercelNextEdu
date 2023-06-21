import { Message } from "@/types/typing";

export const uploadMessageToUpstash = async (message: Message) => {
  await fetch("/api/addMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
};
