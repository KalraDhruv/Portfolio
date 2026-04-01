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




	let selected_tab = "contact.txt";
</script>

<Terminal content={ content } 
	selected_tab={ selected_tab }
/>
