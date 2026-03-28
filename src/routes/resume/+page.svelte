<script>
	import '../styles.css';
	import "/src/app.css";
</script>

<div class="resume-container">
	<object
		data="/documents/resume.pdf"
		type="application/pdf"
		class="resume-viewer"
		title="Resume"
	>
		<embed
			src="/documents/resume.pdf"
			type="application/pdf"
			class="resume-viewer"
		/>
		<p class="fallback">
			Your browser does not support inline PDFs.
			<a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer">
				Download Resume (PDF)
			</a>
		</p>
	</object>
</div>

<style>
	.resume-container {
		width: 100%;
		height: 100%;
		border-radius: 0.75rem;
		overflow: hidden;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
	}

	.resume-viewer {
		width: 100%;
		height: 100%;
		border: none;
		background: #1e1e2e;
	}

	.fallback {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 1rem;
		color: #cdd6f4;
		font-family: 'Cascadia Code', 'Fira Mono', monospace;
		font-size: 0.9rem;
	}

	.fallback a {
		color: #89b4fa;
		text-decoration: underline;
	}

	.fallback a:hover {
		color: #b4befe;
	}
</style>
