<script>
    import { transcript_store } from '$lib/stores';
    import { goto } from '$app/navigation';
    import { FileDropzone, ProgressRadial } from '@skeletonlabs/skeleton';
    //let fileInput;
    let fileList;
    let loading = false;

    async function handleUpload() {
        if (!fileList) return;
        loading = true;
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

        loading = false;
        goto('/story');
    }
</script>


<!-- <input type="file" bind:files={fileList} accept=".mp3" /> -->

<div class="mx-auto w-full max-w-xl p-4">
    <div class="flex flex-col items-center space-y-8">
        <!-- Your content here will be horizontally centered -->
        <!-- <h1 class="h2 not-italic">Upload your Story</h1> -->
        <p class="text-xl font-bold">Upload your Story Recording</p>

        <FileDropzone name="files" bind:files={fileList}>
            <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
            <svelte:fragment slot="message">Upload a file or drag and drop</svelte:fragment>
            <svelte:fragment slot="meta">MP3 Allowed</svelte:fragment>
        </FileDropzone>

        <button class="btn variant-filled" on:click={handleUpload}>Submit</button>

        {#if loading}
        <ProgressRadial/>
        {/if}
    </div>
</div>


