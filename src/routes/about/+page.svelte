<script>
	export let data;
	export let params;
	import '../styles.css';
	import "/src/app.css";
	import Terminal from "../components/Terminal.svelte"

		let content = {
		"about-me.txt": `### About Me

Hello,

I'm Dhruv Kalra, a Computer Science student graduating in December 2025. My journey into programming began before university, through [Turing Complete](https://turingcomplete.game/)—a game gifted to me by my uncle—a software developer. That game went beyond entertainment and was my first lesson in computational thinking, abstraction, and problem-solving. The satisfaction of discovering first a working and then an elegant approach to a problem pushed me towards Computer Science.

My uncle also guided my choice of first language: C++. He told me: "Master C++, and almost every other language becomes easier to learn and implement." He was right.

Struggling with pointers and references taught me how to understand programming at a fundamental level—not just syntax, but the underlying mechanics. This foundation gave me confidence to learn quickly and adapt across languages. Since then, I've built projects in C++, Java, JavaScript, Rust, Go, Python, and Lisp, always approaching new technologies with curiosity and rigor.

University coursework came naturally to me, so I set myself a more ambitious challenge: supplementing my formal education at Algoma University with publicly available materials from UC Berkeley and MIT. From my first semester through graduation, I've consistently engaged with their learning resources, deepening my understanding of computer science fundamentals and advanced topics alike.

Now, as I approach graduation, I'm eager to apply everything I've learned—from Algoma, Berkeley, MIT, and countless hours of independent exploration—to solving real-world problems.

I'm looking for opportunities where I can contribute meaningfully, continue learning, and grow as a software developer.
`,

	};




	let selected_tab = "about-me.txt";
</script>

<Terminal content={ content } 
	selected_tab={ selected_tab }
/>
