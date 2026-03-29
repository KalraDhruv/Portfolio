<script>
	export let data;
	export let params;
	import '../styles.css';
	import "/src/app.css";
	import Terminal from "../components/Terminal.svelte"

	let content = {
		"intro.txt": `This section includes the projects whose inspiration I got while discovering new things about Computer Science.

These projects not only shows my skill as a developer but also my adaptability across multiple languages and technologies.
`,
		"soundster.txt": `### Soundster

[https://github.com/KalraDhruv/Soundster](https://github.com/KalraDhruv/Soundster)

The idea for this project grew out of my personal passion for music. Soundster is a synthesizer that utilizes the Karplus-Strong algorithm to generate realistic, guitar-like sounds through physical modeling.

This project marked a major milestone in my development journey: it was my first deep dive into multithreading. To ensure the instrument could be played in real-time without lag, I implemented parallel sound generation, allowing multiple notes to ring out simultaneously.

Beyond the backend logic, I built a responsive GUI using JavaFX. It features an interactive piano interface that lights up as keys are pressed, bridging the gap between complex audio synthesis and user-friendly visual feedback.
`,
		"pomogame.txt": `### A gamified Pomodoro Timer

[https://github.com/KalraDhruv/pomogame](https://github.com/KalraDhruv/pomogame)

I started this project out of necessity: I couldn't find a Pomodoro timer that tracked the "overflow"—the extra time I spent working or the moments I rested longer than intended. To solve this, I developed Pomogame, a gamified CLI tool written in Rust, forked and adapted to my specific needs.

The development process was a true learning adventure. My initial attempts to implement features using multithreading resulted in excessive CPU usage, and passing new parameters began breaking the existing architecture. I even experimented with Rust's \`unsafe{}\` block to bypass restrictions.

Ultimately, I stepped back to fully understand the foreign codebase. This allowed me to implement an elegant solution that tracks Player Stamina, Sloth, Streak, and Level. It is now a daily driver in my workflow, integrated directly into my Linux setup via custom Waybar scripts.
`,
	};

	let tab_images = {
		"kzooting.txt": [
			{ 
				"url": "/content/kzooting-switch.webp",
				"alt": "Pictures of a modified MX red switch",
			},
			{ 
				"url": "/content/kzooting-prototype.gif",
				"alt": "A GIF of the first kzooting prototype",
			},
			{ 
				"url": "/content/kzooting-casing.webp",
				"alt": "A Picture of the complete kzooting casing",
			},
			{ 
				"url": "/content/kzooting-client.webp",
				"alt": "Screenshot of my desktop with the kzooting GUI client open",
			},
			{ 
				"url": "/content/kzooting-visualizer.gif",
				"alt": "A GIF showcasinf the kzooting key visualizer",
			},
		],
		"tracking.txt": [
			{ 
				"url": "/content/pft-demo.gif",
				"alt": "A GIF showcasing real time facial tracaking",
			},
			{ 
				"url": "/content/pft-base.webp",
				"alt": "Picture of the facial tracking device's base",
			},
			{ 
				"url": "/content/pft-app.webp",
				"alt": "Picture of the facial tracking desktop app",
			},
			{ 
				"url": "/content/pft-math.webp",
				"alt": "Picture of the 3D simulation for the facial tracking app",
			},
		],
		"yawns.txt": [
			{ 
				"url": "/content/yawns-demo.gif",
				"alt": "A GIF demonstrating different types of yawns",
			},
		],
		"tty-cube.txt": [
			{ 
				"url": "/content/tty-cube-demo.gif",
				"alt": "A GIF demonstrating TTY cube runnning",
			},
		],
	};


	let selected_tab = "intro.txt";

</script>

<Terminal content={ content } tab_images={ tab_images } selected_tab={ selected_tab }/>
