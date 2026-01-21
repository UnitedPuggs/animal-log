<script>
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let scanning = $state(false);
    let decodeTextTest = $state("");
    let decodeTextResultTest = $state("");
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
        alert(`Code matched = ${decodedText}`);
        goto(decodedText);
    }
    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`)
    }
</script>
<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 100%;
        min-height: 500px;
        background-color: black;
    }
</style>
<div>
    <reader id="reader"></reader>
    <span>{decodeTextTest} and result {decodeTextResultTest}</span>
    {#if scanning}
        <button onclick={stopScanning}>Stop</button>
    {:else}
        <button onclick={startScan}>Scan</button>
    {/if}
</div>