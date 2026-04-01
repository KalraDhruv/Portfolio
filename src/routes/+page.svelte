<script>
	export let data;
	export let params;
	import './styles.css';
	import "/src/app.css";
	import Terminal from "./components/Terminal.svelte"


	let text = `
<br>
Use the sidebar for jumping to sections you are interested in. 
<br>
Feeling Bored? Try pressing the image on the top left.
<br>
`;
	let content = {"home.txt": text,};


	let selected_tab = "home.txt";
</script>


<Terminal content={ content } 
	selected_tab={ selected_tab } 
/>
