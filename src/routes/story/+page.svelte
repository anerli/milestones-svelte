<script>
    import { onMount } from 'svelte';
    import { transcript_store } from '$lib/stores';
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    let transcript;
    let generatedStory;

    const generateStory = async (transcript) => {
        const response = await fetch('/api/generate_story', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({transcript: transcript})
        });
        console.log(response);
        const data = await response.json();
        console.log('Data: ', JSON.stringify(data));
        const { story } = data;
        generatedStory = story;
        window.localStorage.setItem("story", generatedStory);
    }

    onMount(() => {
        if ($transcript_store) {
            transcript = $transcript_store;
        } else {
            // try getting from local storage
            transcript = window.localStorage.getItem("transcript");
        }
        if (window.localStorage.getItem("story")) {
            generatedStory = window.localStorage.getItem("story");
        } else {
		    generateStory();
        }
	});
</script>

<div class="mx-auto w-full max-w-4xl p-4">
    <div class="flex flex-col items-center space-y-8">
        <div class="card p-4">
            <p class="text-xl font-bold">Transcript</p>
            <p>{transcript}</p>
        </div>

        <div class="card p-4">
            
            {#if generatedStory}
            <p class="text-xl font-bold">Story</p>
            <p>{generatedStory}</p>
            {:else}
            <ProgressRadial/>
            <p>Generating story...</p>
            {/if}
        </div>
    </div>
</div>