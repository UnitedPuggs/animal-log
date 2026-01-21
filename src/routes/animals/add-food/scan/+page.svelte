<script>
	import { Html5Qrcode } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let html5QRcode;

	onMount(() => {
		html5QRcode = new Html5Qrcode('reader');
		html5QRcode.start(
			{
				facingMode: 'environment'
			},
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
	});

	onDestroy(() => {
		html5QRcode.stop();
	});

	function onScanSuccess(decodedText, decodedResult) {
		html5QRcode.stop();
		goto(decodedText);
	}
	function onScanFailure(error) {
		console.warn(`Error with scanner: ${error}`);
	}
</script>
<div class="flex flex-col items-center justify-center gap-5">
	<reader id="reader" class="w-full min-h-96 bg-black"></reader>
</div>