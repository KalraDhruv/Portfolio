<script>
	import '../styles.css';
	import "/src/app.css";
	import { onMount } from 'svelte';
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { faXmark } from "@fortawesome/free-solid-svg-icons";
	import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
	import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
	import { faBars } from "@fortawesome/free-solid-svg-icons";
    import { slide } from 'svelte/transition';
	import { marked } from 'marked';

	export let content = {
		"sample.txt": `TODO`,
	};

	export let tab_images = {
		"sample.txt": [
			{ 
				"url": "/content/sample.webp",
				"alt": "Sample image",
			},
		],
	};

	export let selected_tab = "introduction.txt";

	export let preserve_white_space = false;

	let gallery_container;
	let text_container;
	let selected_image = {};

	// Typewriter state for tab titles
	let tab_typewriter_texts = {};
	let tab_typing_intervals = {};
	let tab_typing_speed = 120;

	function typewrite_tab(title) {
		// Clear any existing interval for this tab
		Object.keys(tab_typing_intervals).forEach(key => {
			clearInterval(tab_typing_intervals[key]);
		});
		tab_typing_intervals = {};

		// Reset all tab typewriter texts
		Object.keys(content).forEach(key => {
			if (key !== title) {
				tab_typewriter_texts[key] = key; // non-selected tabs show full text
			}
		});

		// Typewrite the selected tab title
		tab_typewriter_texts[title] = "";
		tab_typewriter_texts = {...tab_typewriter_texts};
		let i = 0;

		tab_typing_intervals[title] = setInterval(() => {
			if (i < title.length) {
				tab_typewriter_texts[title] += title[i];
				tab_typewriter_texts = {...tab_typewriter_texts};
				i++;
			} else {
				clearInterval(tab_typing_intervals[title]);
				delete tab_typing_intervals[title];
			}
		}, tab_typing_speed);
	}

	// Render markdown content
	function render_content(tab_title) {
		if (!content[tab_title]) return '';
		if (preserve_white_space) {
			return content[tab_title];
		}
		return marked.parse(content[tab_title]);
	}

	$: rendered_content = render_content(selected_tab);

	function isVideo(img){
		if (img.video_url.endsWith('.mp4') || img.video_url.endsWith('.webm')){
			return true
		}else{
			return false
		}
	}


	function change_tab(tab_title) {
		loadedImages = {};
		selected_tab = tab_title;
		left_shadow_opacity = 0;
		right_shadow_opacity = 1;

		if (gallery_container) { 
			gallery_container.scrollTop = 0;
			gallery_container.scrollLeft = 0;
		}
		if (text_container) { 
			text_container.scrollTop = 0;
			text_container.scrollLeft = 0;
		}


		// Typewrite the tab title
		typewrite_tab(tab_title);
	}

	let showCursor = true;
	let cursorBlink;

	// Stuff to show skeletons for images
	let loadedImages = {};

	function markLoaded(url) {
		loadedImages = { ...loadedImages, [url]: true };
	}


	let is_dropdown_open = false;
	function open_dropdown() {
		is_dropdown_open =!is_dropdown_open;
	}
	function close_dropdown() {
		is_dropdown_open = false;
	}
	function toggle_dropdown() {
		is_dropdown_open =!is_dropdown_open;
	}

	let total_lg_lines = 0;
	let total_lines = 0;

	function calculate_line_numbers() {
		if (!text_container) return;
		const container_height = text_container.scrollHeight;
		total_lines = Math.ceil(container_height / 16);
		total_lg_lines = Math.ceil(container_height / 28);
	};

	let left_shadow_opacity = 0;
	let right_shadow_opacity = 1;

	function update_shadows() {

		const maxScroll = gallery_container.scrollWidth - gallery_container.clientWidth;
		const scrollLeft = gallery_container.scrollLeft;

		left_shadow_opacity = Math.round(10 * Math.min(1, scrollLeft / maxScroll))/10;
		right_shadow_opacity = Math.round(10 * (1 - left_shadow_opacity))/10;
	}

	onMount(() => {
		// Initialize all tab typewriter texts to full text
		Object.keys(content).forEach(key => {
			tab_typewriter_texts[key] = key;
		});
		tab_typewriter_texts = {...tab_typewriter_texts};

    	calculate_line_numbers();
		change_tab(selected_tab);
    
    	const text_observer = new MutationObserver(calculate_line_numbers);
    	text_observer.observe(text_container, { childList: true, subtree: true, characterData: true });
    	text_container.addEventListener("scroll", calculate_line_numbers);

		cursorBlink = setInterval(() => {
			showCursor = !showCursor;
		}, 500);

		return () => {
			clearInterval(cursorBlink);
			Object.keys(tab_typing_intervals).forEach(key => {
				clearInterval(tab_typing_intervals[key]);
			});
		};
  });


</script>
<div class="lg:block hidden">
	<div class="flex w-dvw lg:text-lg text-xs bg-background">
		{#each Object.entries(content) as [title, paragraph]}
			{#if title == selected_tab}
				<div role="button" 
					class="box-shadow text-center items-center justify-center lg:w-48 w-32 lg:rounded-t-xl rounded-t-md bg-muted p-2 text-accent font-bold">
					{tab_typewriter_texts[title] || ""}<span class="{showCursor && tab_typewriter_texts[title] !== title ? 'opacity-1' : 'opacity-0'} transition duration-100">┃</span>
				</div>
			{:else}
				<div role="button" 
					on:click={() => change_tab(title)}
					class="box-shadow text-center items-center justify-center lg:w-48 w-32 lg:rounded-t-xl rounded-t-md bg-background p-2 text-foreground opacity-60 font-bold">
					{title}
				</div>
			{/if}
		{/each}
	</div>
</div>
<div class="lg:hidden block relative flex gap-2">
	{#if Object.keys(content).length > 1}
		<div role="button" 
			on:click={ toggle_dropdown }
			class="text-xs box-shadow text-center flex gap-2 items-center justify-center w-36 rounded-t-md bg-muted p-2 text-accent font-bold">
			{tab_typewriter_texts[selected_tab] || ""}<span class="{showCursor && tab_typewriter_texts[selected_tab] !== selected_tab ? 'opacity-1' : 'opacity-0'} transition duration-100">┃</span>
			{#if is_dropdown_open}
				<FontAwesomeIcon icon={faAngleUp} />
			{:else}
				<div class="">
					<FontAwesomeIcon icon={faBars} class=""/>
				</div>
			{/if}
		</div> 
			{#if is_dropdown_open}
				<div class="lg:hidden block z-30 fixed inset-0 bg-black bg-opacity-0 transition-opacity" on:click={close_dropdown}></div>
				<div class="absolute rounded-b-md left-0 top-full w-36 flex flex-col text-xs bg-muted shadow-md z-50"
					transition:slide={{duration: 300}}
				>
					{#each Object.entries(content) as [title, paragraph]}
						{#if title != selected_tab}
							<div role="button" 
								on:click={() => { is_dropdown_open = false; change_tab(title)}}
								class="box-shadow text-center flex items-center justify-center lg:w-48 w-36 bg-background p-2 text-foreground opacity-60 font-bold">
								{title}
							</div>
						{/if}
					{/each}
				</div>
			{:else}
			<div class="left-0 text-xs text-accent flex items-center justify-center">
				+{Object.keys(content).length - 1} Tabs
			</div>
			{/if}
	{:else}
		<div  
			class="text-xs box-shadow text-center flex gap-2 items-center justify-center w-36 rounded-t-md bg-muted p-2 text-accent font-bold">
			{tab_typewriter_texts[selected_tab] || ""}<span class="{showCursor && tab_typewriter_texts[selected_tab] !== selected_tab ? 'opacity-1' : 'opacity-0'} transition duration-100">┃</span>
		</div>
	{/if}
</div>
<div class="fixed lg:h-full h-dvh lg:w-full w-dvw top-0 left-0 lg:p-8 p-3 lg:pt-[11.7rem] lg:pl-[21rem] pt-[108px] pointer-events-none">
<div class="pointer-events-auto bg-muted {is_dropdown_open? "" : "z-10"} lg:p-4 p-2 lg:rounded-b-xl box-shadow lg:rounded-tr-xl rounded-b-md rounded-tr-md h-full w-full flex overflow-hidden">
	<div class="grid {(selected_tab in tab_images)? "lg:grid-cols-3 lg:grid-rows-1 lg:gap-4 gap-2 grid-rows-3" : "" }  h-full w-full">
		<div class="terminal-content-area bg-background flex col-span-2 lg:row-span-1 row-span-2 flex-row w-full h-full overflow-y-auto overflow-x-clip">
			<div class="crt-scanlines"></div>
			<div class="flex flex-col items-end lg:w-14 w-10 h-full bg-muted">
				{#each Array.from({ length: total_lines }) as _, i}
					<div class="lg:hidden block text-xs lg:px-2 px-1 w-full text-right text-foreground bg-muted">
						{i+1}
					</div>
				{/each}
				{#each Array.from({ length: total_lg_lines }) as _, i}
					<div class="lg:block hidden text-lg lg:px-2 px-1 w-full text-right text-foreground bg-muted">
						{i+1}
					</div>
				{/each}
			</div>
			<div class="flex flex-col w-full h-full overflow-y-auto" bind:this={text_container}>
					<div class="markdown-content { preserve_white_space? "ascii" : "" } lg:text-lg text-xs px-3 text-foreground transition-all">
						{@html rendered_content}
					</div>
			</div>
		</div>
		{#if selected_tab in tab_images}
			<div class="relative w-full grid h-full lg:col-span-1 col-span-2">
				<div 
					bind:this={gallery_container} 
					on:scroll={update_shadows}
					class="flex lg:pr-5 gap-4 p-1 lg:flex-col flex-row lg:items-start items-center { tab_images[selected_tab].length == 1 ? "justify-center" : "justify-start"} lg:h-auto lg:w-full h-full lg:overflow-x-clip lg:overflow-y-auto overflow-x-auto">
					{#each tab_images[selected_tab] as img}
						<div class="relative aspect-video bg-red-200 lg:h-auto lg:w-full h-full">
							<div class="absolute top-0 left-0 w-full h-full aspect-video border-background border-4 ring ring-border bg-border flex items-center justify-center">
								<FontAwesomeIcon icon={faSpinner} class="text-foreground animate-spin text-3xl" />
							</div>
							{#if img.url && (img.url.endsWith('.webm') || img.url.endsWith('.mp4'))}
								<video role="button" 
									on:click={() => { selected_image = img }}
									on:loadeddata={() => markLoaded(img.url)}
									class:loaded={loadedImages[img.url]}
									class="absolute top-0 left-0 aspect-video h-full border-background border-4 ring ring-border hover:border-accent hover:ring-accent object-cover" src={img.url} muted loop autoplay playsinline></video>
							{:else}
								<img role="button" 
									on:click={() => { selected_image = img }}
									on:load={() => markLoaded(img.url)}
									class:loaded={loadedImages[img.url]}
									class="absolute top-0 left-0 aspect-video h-full border-background border-4 ring ring-border hover:border-accent hover:ring-accent" src={img.url} alt={img.alt} />
							{/if}
						</div>
					{/each}
					{#if (Object.keys(selected_image).length !== 0) }
						<div 
							on:click={() => { selected_image = {} }}
							class="z-20 fixed p-16 bg-black opacity-70 top-0 left-0 h-dvh w-dvw">
						</div>
						<div class="pointer-events-none fixed z-30 top-0 left-0 w-dvw h-dvh flex flex-col items-center justify-center p-4">
							<div class="z-10 {isVideo(selected_image) ? 'lg:w-3/4' : 'lg:w-2/3'} w-full flex flex-col items-end">
								<button
									class="pointer-events-auto pb-2"
									on:click={() => { selected_image = {}}}
								>
									<FontAwesomeIcon icon={faXmark} class="text-lg aspect-square px-2 bg-background py-2 text-foreground"/>
								</button>
								{#if isVideo(selected_image)}
									<video
										role="button"
										on:click={() => window.open(selected_image.video_url, '_blank')}
										class="surrounding-shadow pointer-events-auto border-8 border-background opacity-100 w-full"
										src={selected_image.video_url}
										alt={selected_image.alt}
										controls
										autoplay
										loop
									>
										Video Tag not supported 	
									</video>
								{:else}
									<img
										role="button"
										on:click={() => window.open(selected_image.url, '_blank')}
										class="surrounding-shadow pointer-events-auto border-8 border-background opacity-100 w-full"
										width="1225"
										src={selected_image.url}
										alt={selected_image.alt}
									/>
								{/if}
							</div>
						</div>
					{/if}
				</div>
				{#if tab_images[selected_tab].length > 1 }
					<div class="lg:hidden block absolute pointer-events-none grid grid-cols-12 top-0 left-0 w-full h-full">
						<div class="bg-gradient-to-r from-muted to-transparent w-full h-full" style="opacity: {left_shadow_opacity}">
						</div>
						<div class="col-span-10"/>
						<div class="bg-gradient-to-l from-muted to-transparent w-full h-full" style="opacity: {right_shadow_opacity}">
						</div>
					</div>
				{/if}
			</div>
		{/if}	
	</div>
</div>
</div>

<style>
	.ascii {
		font-family: monospace;
		white-space: pre;
	}
	@keyframes upDown {
    0%, 100% { transform: translateY(-2px); }
    50% { transform: translateY(1px); } 
	}
	@keyframes blink {
		from { opacity: 1; }
		to { opacity: 0; }
	}

	/* CRT Scanline overlay */
	.terminal-content-area {
		position: relative;
	}
	.crt-scanlines {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.04) 0px,
			rgba(0, 0, 0, 0.04) 1px,
			transparent 1px,
			transparent 3px
		);
		pointer-events: none;
		z-index: 5;
	}



	/* Markdown content styles */
	.markdown-content :global(h1) {
		font-size: 1.8em;
		font-weight: 700;
		margin: 0.6em 0 0.4em;
		color: var(--accent);
	}
	.markdown-content :global(h2) {
		font-size: 1.5em;
		font-weight: 700;
		margin: 0.5em 0 0.3em;
		color: var(--accent);
	}
	.markdown-content :global(h3) {
		font-size: 1.25em;
		font-weight: 600;
		margin: 0.4em 0 0.3em;
		color: var(--accent);
	}
	.markdown-content :global(h4),
	.markdown-content :global(h5),
	.markdown-content :global(h6) {
		font-size: 1.1em;
		font-weight: 600;
		margin: 0.3em 0 0.2em;
		color: var(--accent);
	}
	.markdown-content :global(p) {
		margin: 0.5em 0;
		line-height: 1.7;
	}
	.markdown-content :global(a) {
		color: var(--accent);
		text-decoration: underline;
		transition: color 0.2s ease;
	}
	.markdown-content :global(a:hover) {
		color: var(--accent);
	}
	.markdown-content :global(ul),
	.markdown-content :global(ol) {
		margin: 0.4em 0;
		padding-left: 1.5em;
	}
	.markdown-content :global(li) {
		margin: 0.2em 0;
		line-height: 1.6;
	}
	.markdown-content :global(ul) {
		list-style-type: disc;
	}
	.markdown-content :global(ol) {
		list-style-type: decimal;
	}
	.markdown-content :global(code) {
		background: rgba(108, 112, 134, 0.3);
		padding: 0.15em 0.4em;
		border-radius: 4px;
		font-family: 'Cascadia Code', monospace;
		font-size: 0.9em;
	}
	.markdown-content :global(pre) {
		background: rgba(30, 30, 46, 0.8);
		padding: 0.8em 1em;
		border-radius: 6px;
		overflow-x: auto;
		margin: 0.6em 0;
		border: 1px solid rgba(108, 112, 134, 0.3);
	}
	.markdown-content :global(pre code) {
		background: none;
		padding: 0;
	}
	.markdown-content :global(blockquote) {
		border-left: 3px solid var(--accent);
		padding: 0.4em 1em;
		margin: 0.5em 0;
		color: var(--foreground);
		background: rgba(108, 112, 134, 0.1);
		border-radius: 0 4px 4px 0;
	}
	.markdown-content :global(table) {
		border-collapse: collapse;
		margin: 0.6em 0;
		width: 100%;
	}
	.markdown-content :global(th),
	.markdown-content :global(td) {
		border: 1px solid var(--border);
		padding: 0.4em 0.8em;
		text-align: left;
	}
	.markdown-content :global(th) {
		background: rgba(108, 112, 134, 0.3);
		font-weight: 600;
		color: var(--accent);
	}
	.markdown-content :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 1em 0;
	}
	.markdown-content :global(strong) {
		color: var(--accent);
		font-weight: 700;
	}
	.markdown-content :global(em) {
		color: var(--accent);
		font-style: italic;
	}

</style>
