import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

const openai = new OpenAI();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({url, request}) {
    request.body;
    console.log(JSON.stringify(request));

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
        return new Response("No audio data provided", {status: 400});
    }
    // File object? Yes!
    console.log(`Received audio file: ${audioFile.name}`);

    // Forward to OpenAI to transcribe
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,//.stream(),
        model: 'whisper-1'
    });
    const transcript = transcription.text;

    console.log('transcript: ', transcript);

    return json({transcript: transcript});
    //return new Response('coolio', {status: 200});
    // try {
    //     const mp3 = request.body.get('mp3');
    //     if (!mp3) {
    //         throw error(400, 'No MP3 file provided');
    //     }

    //     const filePath = path.join('uploads', mp3.name);

    //     // Save the file to the 'uploads' directory
    //     fs.writeFileSync(filePath, new Uint8Array(await mp3.arrayBuffer()));

    //     return {
    //         status: 200,
    //         body: { message: 'File uploaded successfully!' }
    //     };
    // } catch (err) {
    //     return {
    //         status: err.status || 500,
    //         body: { error: err.message || 'Failed to upload file.' }
    //     };
    // }
}
