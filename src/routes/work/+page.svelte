<script>
	import '../styles.css';
	import "/src/app.css";
	import Terminal from "../components/Terminal.svelte"

		let content = {
		"intro.txt": `Here, you will find about my work experience in Software. Click on the tabs above to jump to different sections.`,
		"algoma.txt": `### Research Assistant - Algoma University (September 2024 - February 2025)

I was approached by my Computer Architecture Professor to assist with research on GPU performance.

My role involved developing CUDA code to run on GPUs. It ranged from benchmark development to comparing the performance of the latest LLMs on GPUs versus CPUs. Through this work, I deepened my understanding of GPU architecture and gained hands-on experience with kernel programming in C++ and Python. I worked on a university server with the following specifications:

- 2 x AMD EPYC 9534
- 3 x NVIDIA L4 GPU

During my time as a research assistant, I also read extensively on AI and quantum computing research.

Unfortunately, this work is private and I don't have permission to share it online. However, I'm currently developing a personal project based on the skills I learned at Algoma, which I'll share on this website once completed.
`,
		"code-ninjas.txt": `### Code Sensei - Code Ninjas (September 2024 - Present)

Code Ninjas is the world's largest and fastest-growing kids' coding franchise, with hundreds of locations in the United States, Canada, and the United Kingdom. My role at Code Ninjas encompasses teaching children programming concepts and working with robotics.

At my branch, I was hired to develop the curriculum for the newly launched Robotics Academy.

My work involved experimenting with robots through:

1. **Programming Robots**: Adding new functionalities based on the native capabilities provided by the manufacturer.
2. **Simulating Robots**: Simulating robotics code and hardware before making physical investments, using ROS2 and Gazebo.

I also enjoy teaching kids new programming concepts. Seeing their excitement when they finally develop the functionality they were aiming for pushes me to go beyond my previous skillset.
`,
		"proj-bindr.txt": `### Web Developer - Project Bindr (October 2025 - Present)

I was given the opportunity to contribute to a start-up through my university's XR Program. In this role, I'm developing their new website using Umbraco CMS, transforming design concepts into a responsive, professional web presence.

My responsibilities include:

- Building the front-end architecture using HTML, CSS, and JavaScript with a focus on responsive design across all devices
- Developing a complete shop page with product catalog integration in Umbraco
- Implementing SEO optimization strategies to improve search visibility and organic reach
- Writing modular, maintainable code that follows best practices for scalability
- Translating design mockups into functional interfaces

Working with Umbraco has given me valuable experience in CMS-based development, while building features from the ground up has deepened my understanding of web architecture, e-commerce functionality, and the importance of writing clean, reusable code. This role has been instrumental in bridging the gap between my academic knowledge and real-world software development practices.
`,

	};

	let tab_images = {
		"code-ninjas.txt": [
			{
				"video_url":"",
				"url": "/content/code-ninjas.avif",
				"alt": "code-ninjas",
			},
			{
				"video_url":"/content/robo-dog.webm",
				"url": "/content/robo-dog.webm",
				"alt": "robo-dog demo",
			},
		],
		"proj-bindr.txt": [
			{
				"video_url":"/content/proj-bindr.webm",
				"url": "/content/proj-bindr.webm",
				"alt": "proj-bindr demo",
			},
		],
	};


	let selected_tab = "intro.txt";


</script>

<Terminal content={ content } 
	tab_images={ tab_images } 
	selected_tab={ selected_tab }
/>
