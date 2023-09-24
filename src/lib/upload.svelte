<script>
    //let fileInput;
    let files;

    async function handleUpload() {
        console.log(files);
        console.log('type of file list:', typeof files);
        console.log('number of files: ', files.length);

        const file = files.item(0);//files[0];
        //const file = files[0];

        console.log(typeof file);
        console.log(JSON.stringify(file));
        console.log(file.name);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        //reader.onload

        
        //console.log(fileInput);
        const formData = new FormData();
        // console.log(JSON.stringify(files));
        // console.log(JSON.stringify(files[0]));
        // formData.append('mp3', files[0]);
        formData.append('audio', file);

        const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData
        });
        console.log(response.status);
        console.log(JSON.stringify(response));
        //const data = await response.json();
        //console.log(data);
    }
</script>

<!-- <input type="file" id="file-upload" bind:this={fileInput} accept=".mp3" /> -->
<!-- <button on:click={handleUpload}>Upload</button> -->
<input type="file" bind:files={files} accept=".mp3" />
<button on:click={handleUpload}>Upload</button>

<!-- /upload?/transcribe upload: route to action, transcribe: name of action -->
<!-- <form method="post" action="/upload?/transcribe">
    <input type="file" id="file-upload" name="file-upload"/>
    <button type="submit">submit</button>
</form> -->


<!-- <form
    action="?/transcribe"
    method="post"
    enctype="multipart/form-data"
  >
<input
    type="file"
    name="file"
    id="file"
    accept="application/pdf"
/> -->

