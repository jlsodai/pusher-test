import Image from "next/image";
import Pusher from "pusher-js";
import { FC } from "react";
import { pusherServer } from "./lib/pusher";
import Messages from "./components/Messages";

export default function Home() {
  // const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  //   cluster: process.env.PUSHER_APP_CLUSTER as string,
  // });

  const addMessage = async () => {
    "use server";
    const date = Date().toString();
    const data = await pusherServer.trigger(
      process.env.NEXT_PUBLIC_PUSHER_CHANNEL!,
      "incoming-message",
      { message: date }
    );
  };

  return (
    <section>
      <Messages roomId={process.env.NEXT_PUBLIC_PUSHER_CHANNEL!} />

      <form action={addMessage}>
        <button type="submit">New Message</button>
      </form>
    </section>
  );
}
