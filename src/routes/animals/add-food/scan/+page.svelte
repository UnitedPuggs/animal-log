<script>
	import { Html5Qrcode } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let html5QRcode;
	let isScanning = false;
	let isInitialized = false;

	onMount(async () => {
		try {
			html5QRcode = new Html5Qrcode('reader');
			await html5QRcode.start(
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
			isInitialized = true;
		} catch (err) {
			console.error('Failed to start scanner:', err);
		}
	});

	onDestroy(async () => {
		if (html5QRcode && isInitialized) {
			try {
				if (html5QRcode.isScanning) {
					await html5QRcode.stop();
				}
				await html5QRcode.clear();
			} catch (err) {
				console.warn('Error cleaning up scanner:', err);
			}
		}
	});

	async function onScanSuccess(decodedText, decodedResult) {
		if (isScanning) return;
		isScanning = true;

		try {
			if (html5QRcode.isScanning) {
				await html5QRcode.stop();
			}
			await html5QRcode.clear();
			goto(decodedText);
		} catch (err) {
			console.error('Error during navigation:', err);
			isScanning = false;
		}
	}

	function onScanFailure(error) {
		const ignoredErrors = ['NotFoundException', 'IndexSizeError'];
		if (!ignoredErrors.some((err) => error.includes(err))) {
			console.warn(`Scanner error: ${error}`);
		}
	}
</script>

<div class="flex flex-col items-center justify-center gap-5">
	<div id="reader" class="w-full min-h-96 bg-black"></div>
</div>
