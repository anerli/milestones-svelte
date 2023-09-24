import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({url, request}) {
    request.body;
    console.log(JSON.stringify(request));
    //const formData = await request.formData();
    const formData = await request.formData();//Object.fromEntries(await request.formData());
    //const mp3 = formData.get('mp3');
    //console.log(JSON.stringify(formData));
    const audioFile = formData.get('audio') as File;
    // File object? Yes!
    console.log(`Received audio file: ${audioFile.name}`);

    // const reader = new FileReader();
    // reader.onload = function(event) {
    //     const audioDataArrayBuffer = event.target.result;
    //     // Do something with the audio data...
    // };
    // reader.readAsArrayBuffer(audioFile);


    // console.log(mp3);
    // console.log(typeof mp3)
    // const mp3FileList = formData.get('mp3');
        
    // if (!mp3FileList || mp3FileList.length === 0) {
    //     throw error(400, 'No MP3 file provided');
    // }

    // const mp3File = mp3FileList[0];

    // console.log(mp3File);

    // //request.body.get('mp3');

    // console.log(JSON.stringify(mp3File));
    
    // Forward to OpenAI to transcribe
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,//.stream(),
        model: 'whisper-1'
    });
    const transcript = transcription.text;

    console.log('transcript: ', transcript)

    return new Response('coolio', {status: 200});
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
