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
		if (html5QRcode) {
			html5QRcode.stop().catch(err => {
				console.warn('Error stopping scanner:', err);
			});
		}
	});

	function onScanSuccess(decodedText, decodedResult) {
		html5QRcode.stop().then(() => {
			goto(decodedText);
		}).catch(err => {
			console.warn('Error stopping scanner:', err);
		});
	}
	function onScanFailure(error) {
		console.warn(`Error with scanner: ${error}`);
	}
</script>

<div class="flex flex-col items-center justify-center gap-5">
	<div id="reader" class="w-full min-h-96 bg-black"></div>
</div>
