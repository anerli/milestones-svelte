<script>
    import { onMount } from 'svelte';
    import { transcript_store } from '$lib/stores';
    import { Paginator, ProgressRadial } from '@skeletonlabs/skeleton';

    let transcript;
    //let generatedStory;
    let pages = [];
    let pageIndex = 0;

    // let paginationSettings = {
    //     page: 0,
    //     limit: 5,
    //     size: pages.length,
    //     amounts: [1,2,5,10],
    // };

    // $: paginatedSource = pages.slice(
    //     paginationSettings.page * paginationSettings.limit,
    //     paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    // )
    
    

    // const generateStory = async (transcript) => {
    //     const response = await fetch('/api/generate_story', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({transcript: transcript})
    //     });
    //     console.log(response);
    //     const data = await response.json();
    //     console.log('Data: ', JSON.stringify(data));
    //     const { story } = data;
    //     generatedStory = story;
    //     window.localStorage.setItem("story", generatedStory);
    // }

    const generateStructuredStory = async (transcript) => {
        const response = await fetch('/api/generate_structured_story', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({transcript: transcript})
        });
        // console.log(response);
        const data = await response.json();
        console.log('Data: ', JSON.stringify(data));
        // const { story } = data;
        // generatedStory = story;
        // window.localStorage.setItem("story", generatedStory);

        pages = data.pages;
        window.localStorage.setItem("pages", JSON.stringify(pages));
        // paginationSettings = {
        //     page: 0,
        //     limit: 5,
        //     size: pages.length,
        //     amounts: [1,2,5,10],
        // };// satisfies PaginationSettings; 
    }

    onMount(() => {
        if ($transcript_store) {
            transcript = $transcript_store;
        } else {
            // try getting from local storage
            transcript = window.localStorage.getItem("transcript");
        }
        // if (window.localStorage.getItem("story")) {
        //     generatedStory = window.localStorage.getItem("story");
        // } else {
		//     generateStory();
        // }
        if (window.localStorage.getItem("pages")) {
            pages = JSON.parse(window.localStorage.getItem("pages"));
        } else {
            generateStructuredStory();
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
            
            {#if pages.length != 0}
            <p class="text-xl font-bold text-secondary-500">Story</p>
            <!-- <p style="color: #222222;">{JSON.stringify(pages)}</p> -->
            <!-- {#each paginatedSource as page}
            <p>{JSON.stringify(page)}</p>
            {/each}
            <Paginator
                bind:settings={paginationSettings}
                showFirstLastButtons="{true}"
                showPreviousNextButtons="{false}"
            /> -->
            
            <!-- <p style="color: #222222;">{JSON.stringify(pages[pageIndex])}</p> -->
            <p style="color: #222222;">{pages[pageIndex].text}</p>
            <p style="color: #222222;">[Caption: {pages[pageIndex].image_caption}]</p>
            
            <div class="flex items-center justify-end h-full space-x-8">
            <p style="color: #222222;">Page {pageIndex+1} of {pages.length}</p>
            <button class="btn bg-secondary-500" on:click={() => {pageIndex = Math.max(pageIndex-1, 0)}}>
                <p style="color: #222222;">Prev Page</p>
            </button>
            <button class="btn bg-secondary-500" on:click={() => {pageIndex = Math.min(pageIndex+1, pages.length-1)}}>
                <p style="color: #222222;">Next Page</p>
            </button>
            </div>
            {:else}
            <ProgressRadial meter="stroke-secondary-500"/>
            <p style="color: #222222;">Generating story...</p>
            {/if}
        </div>
    </div>
</div>