<script lang="ts">
	import { optimize } from '$lib/image';

	interface Props {
		url: string;
		description: string;
		class?: string;
		size?: number;
	}

	let { url, description, class: className, size }: Props = $props();
</script>

<img
	class={className}
	srcset={size ? optimize(url, [size]) : optimize(url)}
	alt={description}
/>
