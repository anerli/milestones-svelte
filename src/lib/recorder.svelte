<script>
    import lamejs from 'lamejs';
    
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = saveAudio;
        mediaRecorder.start();
        isRecording = true;
    }

    function stopRecording() {
        mediaRecorder.stop();
        isRecording = false;
    }

    function saveAudio() {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.onload = function(event) {
            const wav = reader.result;
            const mp3 = convertWavToMp3(wav);
            const mp3Blob = new Blob([mp3], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(mp3Blob);
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = 'recording.mp3';
            a.click();
        };
        reader.readAsArrayBuffer(audioBlob);
    }

    function convertWavToMp3(wav) {
    // Decode WAV buffer to get audio data
    const audioData = decodeWav(wav);

    // Check if decoding was successful
    if (!audioData) {
        console.error("Failed to decode WAV data.");
        return null;
    }

    // Use lamejs to convert audio data to MP3
    const mp3enc = new lamejs.Mp3Encoder(1, audioData.sampleRate, 128);
    const mp3 = mp3enc.encodeBuffer(audioData.samples);
    return mp3;
}

function decodeWav(wav) {
    // This is a simplified WAV decoder that extracts audio data from a WAV buffer
    // Assumes 16-bit PCM audio
    if (wav.byteLength < 44 || new DataView(wav).getUint32(0, true) !== 0x46464952) {
        return null; // Not a WAV file
    }

    const view = new DataView(wav);
    const sampleRate = view.getUint32(24, true);
    const byteRate = view.getUint32(28, true);
    const blockAlign = view.getUint16(32, true);
    const bitsPerSample = view.getUint16(34, true);
    const dataStart = wav.indexOf("data") + 4;
    const dataLength = view.getUint32(dataStart, true);

    const samples = new Int16Array(wav.slice(dataStart + 4));

    return {
        sampleRate: sampleRate,
        samples: samples
    };
}

</script>

<button on:click={isRecording ? stopRecording : startRecording}>
    {isRecording ? "Stop Recording" : "Start Recording"}
</button>
