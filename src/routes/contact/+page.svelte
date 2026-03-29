<script>
	export let data;
	export let params;
	import '../styles.css';
	import "/src/app.css";
	import Terminal from "../components/Terminal.svelte"

	let content = {
"contact.txt": `### Contact info

| Field | Value |
| --- | --- |
| E-mail | [dhruvkalra0107@gmail.com](mailto:dhruvkalra0107@gmail.com) |
`,

	};

	let tab_images = {
	};


	let selected_tab = "contact.txt";
</script>

<Terminal content={ content } 
	tab_images={ tab_images } 
	selected_tab={ selected_tab }
/>
