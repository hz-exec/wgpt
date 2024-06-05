"use client";
import { readStreamableValue } from "ai/rsc";
import { llmChat } from "./actions";
import Inputs from "./inputs";
import Messages from "./messages";
import styles from "./page.module.css";
import { useState } from "react";
import MarkdownMessage from "./md";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([{role: "system", content: "You are a friendly assistant!"}]);
  const [response, setResponse] = useState("");

  const sendMessage = async (data: string) => {
    console.log("sendMessage data", data);
    setResponse("");
    setMessages([...messages, { role: "user", content: data}]);

    const {history, newResponse} = await llmChat(messages, data);

    let textContent = "";
    for await (const delta of readStreamableValue(newResponse)) {
      textContent += delta;
      setResponse(textContent);
    }

    setResponse("");
    setMessages([...history, { role: "assistant", content: textContent}]);
  }
  
  return (
    <div className={styles.chat_container}>
        <div className={styles.chat_child_messages}>
            <Messages messages={messages}/>
            <div className={styles.message_padding}>
              <MarkdownMessage content={response} />
            </div>
        </div>
        <div className={styles.chat_child_inputs}>
            <Inputs onClick={sendMessage}/>
        </div>
    </div>
  );
}
