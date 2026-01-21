<script>
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';

    let scanning = $state(false);
    let html5QRcode;

    onMount(() => {
        init();
    });

    function init() {
        html5QRcode = new Html5Qrcode('reader');
    }

    function startScan() {
        html5QRcode.start(
            {
                facingMode: 'environment'
            },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
        );
        scanning = true;
    }

    async function stopScanning() {
        await html5QRcode.stop();
        scanning = false;
    }
    function onScanSuccess(decodedText, decodedResult) {
        alert(`Code matched = ${decodedText}`)
        console.log(decodedResult)
    }
    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`)
    }
</script>
<div>
    <reader id="reader"></reader>
    {#if scanning}
        <button onclick={stopScanning}>Stop</button>
    {:else}
        <button onclick={startScan}>Scan</button>
    {/if}
</div>