import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
    const { messages } = await req.json();
    console.log("messages", messages);
    
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        stream: true,
        messages: messages,
    });

    const stream = OpenAIStream(completion);
    return new StreamingTextResponse(stream);
}
