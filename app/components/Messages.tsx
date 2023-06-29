"use client";
import { FC, useEffect, useState } from "react";
import { pusherClient } from "../lib/pusher";

interface MessagesProps {
  roomId: string;
}

interface TextMessage {
  message: string;
}
[];

const Messages: FC<MessagesProps> = ({ roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<
    { message: string }[]
  >([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text: TextMessage) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, []);

  return (
    <div>
      {incomingMessages.map((text, i) => (
        <p key={i}>{text?.message as string}</p>
      ))}
    </div>
  );
};
export default Messages;
