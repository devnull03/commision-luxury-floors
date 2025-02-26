<script lang="ts">
	import { optimize } from '$lib/image';

	interface Props {
		url: string;
		description: string;
		class: string;
	}

	let { url, description, class: className }: Props = $props();
</script>

<img
	class={className}
	srcset={optimize(url)}
	alt={description}
/>
