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

<p>Transcript: {transcript}</p>

<h1>Generated story:</h1>
{#if generatedStory}
<p>{generatedStory}</p>
{:else}
<ProgressRadial/>
<p>Generating story...</p>
{/if}

