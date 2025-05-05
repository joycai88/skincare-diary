import { APIGatewayEvent } from "aws-lambda";
import OpenAI from "openai/index.mjs";
import "dotenv/config"

const env = process.env as { OPENAI_KEY: string };
type RequestBody = {
    subject: string
};


export async function main(event: APIGatewayEvent) {
    const body = JSON.parse(event.body!) as RequestBody;

    if (!body || !body.subject) return {
        statusCode: 400,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
        },
        body: JSON.stringify({message: 'Invalid request'})
    };

    const openai = new OpenAI({ apiKey: env.OPENAI_KEY });

    const prompt = `tell me a joke about ${body.subject}`;

    const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    });

    const result = gptResponse.choices[0].message.content;

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS"
        },
        body: result
    };
}
