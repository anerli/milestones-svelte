import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

const openai = new OpenAI();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({url, request}) {
    const data = await request.json();
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are an incredible storyteller capable of adjusting your tone and language to match an audience of any age." },
            { role: "user", content: `Tell the following story to a 5-year old: ${data.transcript}` }
        ],
        model: "gpt-3.5-turbo",
      });
    const story = completion.choices[0].message.content;
    return json({story});
}