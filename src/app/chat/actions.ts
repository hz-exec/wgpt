// https://sdk.vercel.ai/examples/next-app/chat/stream-chat-completion

"use server";

import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export async function llmChat(history: Message[], q: string) {
    'use server';

    console.log("llmChat history", history);

    const stream = createStreamableValue();
    let messages: Message[] = [...history, { role: "user", content: q }];

    (async () => {
        const { textStream } = await streamText({
            model: openai("gpt-4o"),
            messages: messages,
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
