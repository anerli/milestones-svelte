<script>
    import { transcript_store } from '$lib/stores';
    import { goto } from '$app/navigation';
    //let fileInput;
    let fileList;

    async function handleUpload() {
        if (!fileList) return;
        // console.log(files);
        // console.log('type of file list:', typeof files);
        // console.log('number of files: ', files.length);

        const file = fileList.item(0);//files[0];

        // console.log(typeof file);
        // console.log(JSON.stringify(file));
        // console.log(file.name);

        const formData = new FormData();
        formData.append('audio', file);

        const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData
        });
        // console.log(response.status);
        // console.log(JSON.stringify(response));
        const data = await response.json();
        //console.log(data);
        const { transcript } = data;
        console.log('Got transcript from backend: ', transcript);
        transcript_store.set(transcript);

        goto('/story');
    }
</script>


<input type="file" bind:files={fileList} accept=".mp3" />
<button on:click={handleUpload}>Upload</button>
