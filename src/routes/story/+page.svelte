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
        <div class="bg-error-50 card p-4 bg-error-50 fg-error-50 border-solid" style="background-color: #fcfcfc; border: 1px solid black;">
            <p class="text-xl font-bold text-secondary-500">Transcript</p>
            <p class="text-primary-900" style="color: #222222;">{transcript}</p>
        </div>

        <div class="card p-4" style="background-color: #fcfcfc; border: 1px solid black;">
            
            {#if generatedStory}
            <p class="text-xl font-bold text-secondary-500">Story</p>
            <p style="color: #222222;">{generatedStory}</p>
            {:else}
            <ProgressRadial meter="stroke-secondary-500"/>
            <p style="color: #222222;">Generating story...</p>
            {/if}
        </div>
    </div>
</div>