<script>
    import { onMount } from 'svelte';
    import { transcript_store } from '$lib/stores';

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
    }

    onMount(() => {
        if ($transcript_store) {
            transcript = $transcript_store;
        } else {
            // try getting from local storage
            transcript = window.localStorage.getItem("transcript");
        }
		generateStory();
	});
</script>

<p>Transcript: {transcript}</p>

<h1>Generated story:</h1>
{#if generatedStory}
<p>{generatedStory}</p>
{:else}
<p>Generating story...</p>
{/if}

