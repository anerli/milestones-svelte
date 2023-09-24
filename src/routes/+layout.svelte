<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar background="bg-surface-50">
			<svelte:fragment slot="lead">
				<a href="/" class="text-xl font-bold text-secondary-500">Milestones</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<!-- <style>
	.background-gradient {
		background: linear-gradient(to bottom, #FAC252, white);
	}

	body {
		margin: 0;
		height: 100vh;
		background: linear-gradient(to bottom, #FAC252, white);
	}
</style> -->