<script>
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
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        // Convert to MP3 here using lamejs or another library
        // For simplicity, we'll just provide a download link for the WAV file
        const audioUrl = URL.createObjectURL(audioBlob);
        const a = document.createElement("a");
        a.href = audioUrl;
        a.download = "recording.wav";
        a.click();
    }
</script>

<button on:click={isRecording ? stopRecording : startRecording}>
    {isRecording ? "Stop Recording" : "Start Recording"}
</button>
