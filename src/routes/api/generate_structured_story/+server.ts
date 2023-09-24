import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

const openai = new OpenAI();

const head = "Write a 3rd-grade reading level childrens picture-book based on the following story:\n";
const tail = "Structure the book by page, with the content and image on each page.";

const page_schema = {
    "type": "object",
    "properties": {
        "text": {
            "type": "string",
            description: "The text content for this page."
        },
        "image_caption": {
            "type": "string",
            description: "Caption for an image to include on this page."
        }
    },
    "required": ["text", "image_caption"]
};
const output_schema = {
    "type": "object",
    "properties": {
        pages: {
            "type": "array",
            "items": page_schema
        }
    },
    required: ["pages"]
}
  
const output_func = {
    name: "submit_book",
    description: "Submit a written childrens book",
    parameters: output_schema
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({url, request}) {
    const data = await request.json();
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are an incredible storyteller capable of adjusting your tone and language to match an audience of any age." },
            { role: "user", content: `${head}${data.transcript}${tail}` }
        ],
        functions: [output_func],
        model: "gpt-3.5-turbo",
        function_call: {name: "submit_book"}
      });
    //const story = JSON.parse(completion.choices[0].message.function_call["story"].arguments);
    const call = completion.choices[0].message.function_call;
    console.log(JSON.stringify(call));

    // Like {pages: []}
    const story = JSON.parse(call.arguments);
    return json(story);
}