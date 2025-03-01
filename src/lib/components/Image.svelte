<script lang="ts">
	import { optimize } from '$lib/image';

	interface Props {
		url: string;
		description: string;
		class?: string;
		size?: number[];
		quality?: number;
	}

	let { url, description, class: className, size=[640, 828, 1200], quality = 90 }: Props = $props();
</script>

<img
	class={className}
	srcset={optimize(url, size, quality)}
	alt={description}
/>
