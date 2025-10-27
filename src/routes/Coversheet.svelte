<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let coversheetFrame;
	let coversheetPath = base + "/coversheet.html?" + Math.random().toString(36).slice(2);

	onMount(() => {
		if(onLoaded) {
			if(coversheetFrame){
				function loadEventListener(event) {
					if(!event.data.csReady) return;
					onLoaded(coversheetFrame);
					window.removeEventListener('message', loadEventListener);
				}
				window.addEventListener('message', loadEventListener);
			}
		}
	});

	export let onLoaded;
</script>

<style type="text/css">
	iframe {
		width: 100%;
		overflow: hidden;
		aspect-ratio: 8.5 / 9;
/*		height: 80vh;*/
	}
</style>

<iframe name="coversheet" src={coversheetPath} bind:this={coversheetFrame}></iframe>