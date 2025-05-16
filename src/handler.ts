import { APIGatewayEvent } from "aws-lambda";
import fetch from "node-fetch";

type Message = {
    text: string,
    sender: 'ai' | 'user'
}

const env = process.env as { OPENAI_KEY: string };
const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    "Vary": "Origin"
};
type RequestBody = {
    messages: Message[]
};


export async function main(event: APIGatewayEvent) {
    console.log("Incoming request method:", event.httpMethod);
    console.log("Origin header:", event.headers["origin"]);
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: "",
        };
    }

    const body = JSON.parse(event.body!) as RequestBody;

    if (!body || !body.messages) return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({message: 'Invalid request'})
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${env.OPENAI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "you are acting as a dermatologist giving advice about skincare"
                },
                ...body.messages.map(message => ({
                    role: message.sender === "ai" ? "assistant" : "user",
                    content: message.text
                }))
            ]
        })
    });

    const data: any = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
        console.error("OpenAI API returned unexpected format:", data);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Unexpected OpenAI response format." })
        };
    }

    const result = data.choices[0].message.content;

    return {
        statusCode: 200,
        headers: corsHeaders,
        body: result
    };
}
