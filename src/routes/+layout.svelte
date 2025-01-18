<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="canonical" href="https://www.arv.sale" />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	{@render children()}
</div>
