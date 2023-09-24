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
        localStorage.setItem("transcript", transcript);
        localStorage.removeItem("story");

        loading = false;
        goto('/story');
    }
</script>


<!-- <input type="file" bind:files={fileList} accept=".mp3" /> -->

<div class="mx-auto w-full max-w-xl p-4">
    <div class="flex flex-col items-center space-y-8">
        <!-- Your content here will be horizontally centered -->
        <!-- <h1 class="h2 not-italic">Upload your Story</h1> -->
        <p class="text-xl font-bold text-secondary-500">Upload your Story Recording</p>

        {#if !fileList}
        <FileDropzone name="files" bind:files={fileList} class="bg-surface-50">
            <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
            <svelte:fragment slot="message">
                <p class="text-primary-50 text-lg">Upload a video or audio file or drag and drop</p></svelte:fragment>
            <!-- <svelte:fragment slot="meta">
                <p class="text-primary-100 text-lg">P</p>
            </svelte:fragment> -->
        </FileDropzone>
        {:else if loading}
        <ProgressRadial meter="stroke-secondary-500"/>
        <p class="text-primary-900">Please wait while we transcribe your recording...</p>
        {:else}
        <FileDropzone name="files" bind:files={fileList} border='border-solid bg-error-500'>
            <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
            <svelte:fragment slot="message">
                <p class="text-primary-50 text-lg">{fileList[0].name} Uploaded!</p>
            </svelte:fragment>
        </FileDropzone>
        {/if}

        <button class="btn variant-filled" on:click={handleUpload}>Submit</button>

        <!-- {#if loading}
        <ProgressRadial/>
        {/if} -->
    </div>
</div>


