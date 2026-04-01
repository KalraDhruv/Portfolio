<script lang="ts">
	export let data;
	export let params;
	import './styles.css';
	import "/src/app.css";
	import { onMount } from 'svelte';
	import { fly } from "svelte/transition";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
	import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
	import { faYoutube } from "@fortawesome/free-brands-svg-icons";
	import { faDiscord } from "@fortawesome/free-brands-svg-icons";
	import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
	import { faFolder } from "@fortawesome/free-regular-svg-icons";
	import { faFileCode } from "@fortawesome/free-regular-svg-icons";
	import { faFile } from "@fortawesome/free-regular-svg-icons";
	import { faFileLines } from "@fortawesome/free-regular-svg-icons";
	import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
	import { faBars } from "@fortawesome/free-solid-svg-icons";
	import { faXmark } from "@fortawesome/free-solid-svg-icons";
	import { faCode } from "@fortawesome/free-solid-svg-icons";
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import BootSequence from "./components/BootSequence.svelte";
		

	const side_pane_items = [
		{
			title: "~",
			link:"/",
			icon: faFolderOpen,
		},
		{
			title: "about-me.txt",
			link: "/about",
			icon: faFileLines,
		},
		{
			title: "my-work",
			link: "/work",
			icon: faFolder,
		},
		{
			title: "cool-projects",
			link: "/projects",
			icon: faFolder,
		},
		{
			title: "dotfiles.txt",
			link: "/dots",
			icon: faFileLines,
		},
		{
			title: "contact-info.txt",
			link: "/contact",
			icon: faFileLines,
		},
		{
			title: "resume.pdf",
			link: "/resume",
			icon: faFilePdf,
		},
	];

	let is_menu_open = false;
	let is_gif_visible = false;
	let boot_done = false;

	function open_menu() {
		is_menu_open = true;	
	}
	function gif_view() {
		is_gif_visible = !is_gif_visible;
	}
	function close_menu() {
		is_menu_open = false;	
	}


	let selected_item = "~";

	// Typewriter state for sidebar items
	let sidebar_typewriter_texts: Record<string, string> = {};
	let sidebar_typing_interval: ReturnType<typeof setInterval> | undefined = undefined;
	let sidebar_typing_speed = 25;
	let showSidebarCursor = true;
	let sidebar_typing_active = false;

	function typewrite_sidebar_item(title: string) {
		// Clear any existing interval
		if (sidebar_typing_interval) {
			clearInterval(sidebar_typing_interval);
			sidebar_typing_interval = undefined;
		}

		// All items show full text except the one being typed
		side_pane_items.forEach(item => {
			sidebar_typewriter_texts[item.title] = item.title;
		});

		// Typewrite the clicked item
		sidebar_typewriter_texts[title] = "";
		sidebar_typewriter_texts = {...sidebar_typewriter_texts};
		sidebar_typing_active = true;
		let i = 0;

		sidebar_typing_interval = setInterval(() => {
			if (i < title.length) {
				sidebar_typewriter_texts[title] += title[i];
				sidebar_typewriter_texts = {...sidebar_typewriter_texts};
				i++;
			} else {
				clearInterval(sidebar_typing_interval);
				sidebar_typing_interval = undefined;
				sidebar_typing_active = false;
			}
		}, sidebar_typing_speed);
	}

	function get_sidebar_text(title: string) {
		return sidebar_typewriter_texts[title] || title;
	}

	// Terminal prompt breadcrumb
	const path_map: Record<string, string> = {
		"/": "~",
		"/about": "~/about-me.txt",
		"/work": "~/my-work",
		"/projects": "~/cool-projects",
		"/dots": "~/dotfiles.txt",
		"/contact": "~/contact-info.txt",
		"/resume": "~/resume.pdf",
	};

	let terminal_path = "~";

	
	import { page } from "$app/stores";

	
	$: {
		const currentPath = $page.url.pathname;
		const matchedItem = side_pane_items.find(item => item.link === currentPath);
		if (matchedItem) {
			selected_item = matchedItem.title;
		}
		terminal_path = path_map[currentPath] || "~";
	}

	let show_content = false;
	  onMount(() => {
		// Initialize all sidebar texts to full text
		side_pane_items.forEach(item => {
			sidebar_typewriter_texts[item.title] = item.title;
		});
		sidebar_typewriter_texts = {...sidebar_typewriter_texts};

		// Typewrite the initially selected item
		typewrite_sidebar_item(selected_item);

		requestAnimationFrame(() => show_content = true);

		// Cursor blink
		const cursorInterval = setInterval(() => {
			showSidebarCursor = !showSidebarCursor;
		}, 500);

		return () => {
			clearInterval(cursorInterval);
			if (sidebar_typing_interval) clearInterval(sidebar_typing_interval);
		};
  });

	function on_boot_complete() {
		boot_done = true;
	}

</script>

<BootSequence on:complete={on_boot_complete} />

<div class="app bg-background h-dvh w-full overflow-hidden">
	<main>
		{#if is_menu_open}
			<div class="lg:hidden block z-30 fixed inset-0 bg-black bg-opacity-70 transition-opacity" on:click={close_menu}></div>
		{/if}
		{#if is_menu_open}
			<aside
				class="lg:hidden block z-30 pt-12 fixed top-0 right-0 h-full w-48 bg-muted shadow-lg flex flex-col gap-1 p-2 transition-transform"
				transition:fly={{ x: 200, duration: 300 }}
			>
				<button
					class="absolute top-2 right-0"
					on:click={close_menu}
				>
					<FontAwesomeIcon icon={faXmark} class="text-lg aspect-square px-4 py-2 text-foreground"/>
				</button>
				<div class="flex flex-col gap-2 w-full bg-muted p-4 rounded-md">
				{#each side_pane_items as item}
					{#if item.title == "~"}
						<a href="/" class="w-full" on:click={() => { close_menu(); typewrite_sidebar_item(item.title); }}>
							{#if selected_item === "~"}
								<div role="button" class="text-xs w-full p-3 py-1 flex gap-2 flex-row rounded-md items-center role-button group bg-accent transition-all">
									<FontAwesomeIcon icon={faFolderOpen} class="text-background" />
									<h2 class="text-background">{get_sidebar_text("~")}<span class="{showSidebarCursor && sidebar_typing_active && selected_item === '~' ? 'opacity-1' : 'opacity-0'} transition duration-100">┃</span></h2>
								</div>
							{:else}
								<div role="button" class="text-xs w-full p-3 py-1 flex gap-2 flex-row rounded-md items-center role-button group transition-all">
									<FontAwesomeIcon icon={faFolderOpen} class="text-accent group-hover:translate-x-1" />
									<h2 class="text-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:underline">~</h2>
								</div>
							{/if}
						</a>
					{:else}
						<a href={item.link} class="text-foreground group w-full hover:text-background" on:click={() => { close_menu(); typewrite_sidebar_item(item.title); }}>
							<div class="w-full flex flex-col pl-4">
								{#if selected_item === item.title}
									<div role="button" class="text-xs w-full p-3 py-1 flex gap-2 flex-row rounded-r-md items-center role-button group bg-accent transition-all">
										<FontAwesomeIcon icon={item.icon} class="text-background" />
										<div class="text-background">{get_sidebar_text(item.title)}<span class="{showSidebarCursor && sidebar_typing_active && selected_item === item.title ? 'opacity-1' : 'opacity-0'} transition duration-100">┃</span></div>
									</div>
								{:else}
									<div role="button" class="border-l-2 border-accent text-xs w-full p-3 py-1 flex gap-2 flex-row rounded-r-md items-center role-button group transition-all">
										<FontAwesomeIcon icon={item.icon} class="text-accent group-hover:text-accent group-hover:translate-x-1 " />
										<div class="text-foreground group-hover:underline group-hover:text-accent group-hover:translate-x-1">
											{item.title}
										</div>
									</div>
								{/if}
							</div>
						</a>
					{/if}
				{/each}
			</div>
			</aside>
		{/if}



		<div class="{show_content? "opacity-100" : "opacity-0"} transition duration-200 h-dvh overflow-hidden w-full bg-background lg:p-8 p-3">
			<div class="flex flex-col h-full lg:gap-8 gap-3 w-full">
				<div class="grid grid-cols-2 lg:p-4 lg:px-6 lg:rounded-xl rounded-md box-shadow bg-muted">
					<div class="lg:py-0 py-1 lg:text-2xl text-sm h-12 flex flex-row lg:gap-4 gap-3 items-center justify-start">
						
						<img  src="/content/anime-profile.png" alt="Pfp" class="responsive-pfp" on:click={gif_view}/>
						
						<!-- Terminal prompt breadcrumb -->
						<div class="terminal-prompt flex flex-row items-center gap-0 font-mono lg:mr-8 whitespace-nowrap">
							<span class="text-tertiary font-bold lg:text-lg text-sm inline">dhruvkalra</span><span class="text-secondary lg:text-lg text-sm inline ">@</span><span class="text-tertiary font-bold lg:text-lg text-sm inline ">arch</span><span class="text-secondary lg:text-lg text-sm lg:inline hidden">:</span><span class="text-accent lg:inline hidden font-bold lg:text-lg text-sm">{terminal_path}</span>
						</div>
						
						<div class="lg:block hidden text-foreground opacity-50 font-bold">
							|
						</div>
						<div class="lg:block hidden text-accent text-base">
							<a class="underline hover:text-accent transition" href="mailto:dhruvkalra0107@gmail.com">dhruvkalra0107@gmail.com</a>
						</div>
					</div>
					<div class="lg:text-4xl text-2xl h-12 flex flex-row gap-4 items-center justify-end">
						{#if is_gif_visible}
							<img src="/content/kurukuru.gif" alt="spin"  class="animated-gif"/>
						{/if}
						<button 
							class="lg:hidden block flex items-center justify-center bg-muted border-l-4 border-border h-full rounded-r-md"
							on:click={open_menu}
						>
							<FontAwesomeIcon icon={faBars} class="px-4 text-lg text-accent rounded-r-md"/>
						</button>
					</div>
				</div>
				<div class="lg:h-full h-full lg:pb-0 pb-3 bg-background w-full flex flex-row gap-8">
					<div class="lg:block w-96 relative hidden h-full bg-muted flex flex-col p-4 rounded-xl box-shadow justify-start items-start">
						{#each side_pane_items as item}
							{#if item.title == "~"}
								<a href="/" class="w-full" on:click={() => typewrite_sidebar_item(item.title)}>
									{#if selected_item === "~"}
										<div role="button" class="text-lg w-60 p-3 py-0 flex gap-2 flex-row rounded-lg items-center role-button group bg-accent transition-all">
											<FontAwesomeIcon icon={faFolderOpen} class="text-background"/>
												<h2 class="text-background">
													{get_sidebar_text("~")}<span class="{showSidebarCursor && sidebar_typing_active && selected_item === '~' ? 'opacity-1' : 'opacity-0'} transition duration-100">┃</span>
												</h2>
										</div>
									{:else}
										<div role="button" class="text-lg w-60 p-3 py-0 flex gap-2 flex-row rounded-lg items-center role-button group transition-all">
											<FontAwesomeIcon icon={faFolderOpen} class="text-accent group-hover:translate-x-1"/>
												<h2 class="text-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:underline">
													~
												</h2>
										</div>
									{/if}
								</a>
							{:else}
								<a href={item.link} class="text-foreground group w-full hover:text-background" on:click={() => typewrite_sidebar_item(item.title)}>
									<div class="w-full flex flex-col pl-4">
										{#if selected_item === item.title}
											<div role="button" class="text-lg w-full p-3 py-0 flex gap-2 flex-row rounded-lg items-center role-button group bg-accent transition-all">
												<FontAwesomeIcon icon={item.icon} class="text-background"/>
												<div class="text-background">
													{get_sidebar_text(item.title)}<span class="{showSidebarCursor && sidebar_typing_active && selected_item === item.title ? 'opacity-1' : 'opacity-0'} transition duration-100">┃</span>
												</div>
											</div>
										{:else}
											<div role="button" class="text-lg w-full p-3 py-0 flex gap-2 flex-row rounded-lg items-center role-button group transition-all">
												<FontAwesomeIcon icon={item.icon} class="text-accent group-hover:text-accent group-hover:translate-x-1"/>
												<div class="text-foreground group-hover:underline group-hover:text-accent group-hover:translate-x-1">
													{item.title}
												</div>
											</div>
										{/if}
									</div>
								</a>
							{/if}
						{/each}
					</div>
					<div class="h-full w-full flex flex-col col-span-4">
						<slot/>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	
	.animated-gif{
		width: 48px;
		height: 48px;
	}
	.responsive-pfp{
		width: 52px;
		height: 40px;
	}
	.terminal-prompt {
		font-family: 'Cascadia Code', 'Fira Mono', monospace;
	}
	@media (min-width: 1024px) {
		.animated-gif{
			width:80px;
			height:80px;
		}
		.responsive-pfp{
		width: 78px;
		height: 60px;
	    }
	}
</style>