<script>
	import '../styles.css';
	import "/src/app.css";
	import Terminal from "../components/Terminal.svelte"

		let content = {
		"dotfiles.txt": `### My rice

This section showcases my desktop layout and configuration. I have customized the desktop environment using multiple "dot files" from different programs. It is the representation of my ideal desktop layout. This was all built on Arch Linux BTW ;)

Soon I will post my dot files on github, don't forget to check that out.

Making this rice was like going on a pilgrimage to other people's ideal rice and achieving enlightenment along the way. My rice is like a home, it's where I work from and it's honestly one of the things that motivates me every time I sit down to code.
`,

	};

	let tab_images = {
		"dotfiles.txt": [
			{ 
				"video_url": "https://assets0107.blob.core.windows.net/media/output.webm",
				"url": "https://assets0107.blob.core.windows.net/media/output.webm",
				"alt": "Wayland Tiling WM Demo",
			},
			{ 
				"video_url":"",
				"url": "/content/dotfiles_pic_1.webp",
				"alt": "Wayland Desktop Output screenshot",
			},
		],
	};


	let selected_tab = "dotfiles.txt";


</script>

<Terminal content={ content } 
	tab_images={ tab_images } 
	selected_tab={ selected_tab }
/>
