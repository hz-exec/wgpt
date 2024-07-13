// https://sdk.vercel.ai/examples/next-app/chat/stream-chat-completion

"use server";

import { CoreAssistantMessage, CoreSystemMessage, CoreToolMessage, CoreUserMessage, ImagePart, TextPart, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export async function llmChat(history: Message[], q: string) {
    'use server';

    const stream = createStreamableValue();
    let messages: Message[] = [...history, { role: "user", content: q, files: null}];

    function toCoreMessages(messages: Message[]) {
        let coreMessages: Array<CoreSystemMessage | CoreUserMessage | CoreAssistantMessage | CoreToolMessage> = [];
        for (const message of messages) {
            if (message.role === "system") {
                coreMessages.push({ role: "system", content: message.content });
            } else if (message.role === "user") {
                if (message.files) {
                    let parts: Array<TextPart | ImagePart> = [];
                    parts.push({ type: "text", text: message.content });
                    for (const file of message.files) {
                        parts.push({ type: "image", image: file.content });
                    }
                    coreMessages.push({ role: "user", content: parts });
                } else {
                    coreMessages.push({ role: "user", content: message.content });
                }
            } else if (message.role === "assistant") {
                coreMessages.push({ role: "assistant", content: message.content });
            } else {
                console.error("Unknown role: " + message.role);
            }
        }
        return coreMessages;
    }

    (async () => {
        const { textStream } = await streamText({
            model: openai("gpt-4o"),
            messages: toCoreMessages(messages),
        });

        for await (const text of textStream) {
            stream.update(text);
        }

        stream.done();
    })();

    return {
        history: messages,
        newResponse: stream.value,
    }
}
