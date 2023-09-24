import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

const openai = new OpenAI();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({url, request}) {
    const data = await request.json();
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are an incredible storyteller capable of adjusting your tone and language to match an audience of any age." },
            { role: "user", content: `Write a 3rd-grade reading level childrens book based on the following story:\nBEGIN DATA\n${data.transcript}\nEND DATA\n\nDesignate page breaks with the ampersand sign '@', and include imagines by describing images inside of bracket captions e.g. [my image description].` }
        ],
        model: "gpt-3.5-turbo",
      });
    const story = completion.choices[0].message.content;
    return json({story});
}
