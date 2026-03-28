<script>
    import { onMount, createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    let lines = [];
    let current_line = 0;
    let boot_complete = false;
    let showCursor = true;
    let fade_out = false;

    const boot_steps = [
        { text: "$ curl -v https://dhruvkalra.dev", delay: 120, color: "text-accent" },
        { text: "* Resolving dhruv.dev (1.1.1.1)... 192.168.1.42", delay: 100, color: "text-foreground opacity-80" },
        { text: "* Connected — TLS 1.3 (ECDHE-RSA-AES256)", delay: 120, color: "text-accent" },
        { text: "< HTTP/2 200 OK", delay: 100, color: "text-accent" },
        { text: "Rendering portfolio... ████████████████ done.", delay: 180, color: "text-accent font-bold" },
    ];

    let typewriter_text = "";
    let typing_current_line = false;

    async function run_boot() {
        for (let i = 0; i < boot_steps.length; i++) {
            const step = boot_steps[i];
            
            // Typewrite each line character by character
            typewriter_text = "";
            typing_current_line = true;
            
            for (let c = 0; c < step.text.length; c++) {
                typewriter_text += step.text[c];
                // Force reactivity
                typewriter_text = typewriter_text;
                await sleep(step.text[c] === ' ' ? 8 : 15);
            }
            
            typing_current_line = false;
            lines = [...lines, { text: step.text, color: step.color }];
            typewriter_text = "";
            
            await sleep(step.delay);
        }
        
        // Brief pause before fade out
        await sleep(400);
        fade_out = true;
        await sleep(600);
        boot_complete = true;
        dispatch('complete');
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Cursor blink
    let cursorInterval;
    
    onMount(() => {
        cursorInterval = setInterval(() => {
            showCursor = !showCursor;
        }, 500);
        
        run_boot();
        
        return () => clearInterval(cursorInterval);
    });
</script>

{#if !boot_complete}
<div class="boot-screen {fade_out ? 'fade-out' : ''}" >
    <div class="boot-scanlines"></div>
    <div class="boot-container">
        <div class="boot-header">
            <span class="text-tertiary font-bold">dhruv@portfolio</span><span class="text-foreground">:</span><span class="text-tertiary font-bold">~</span><span class="text-foreground"> $ init</span>
        </div>
        <div class="boot-lines">
            {#each lines as line}
                <div class="boot-line {line.color}">{line.text || "\u00A0"}</div>
            {/each}
            {#if typing_current_line}
                <div class="boot-line text-foreground">
                    {typewriter_text}<span class="{showCursor ? 'opacity-100' : 'opacity-0'} transition duration-100 text-accent">█</span>
                </div>
            {:else if !fade_out}
                <div class="boot-line">
                    <span class="{showCursor ? 'opacity-100' : 'opacity-0'} transition duration-100 text-accent">█</span>
                </div>
            {/if}
        </div>
    </div>
</div>
{/if}

<style>
    .boot-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        background: var(--background);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Cascadia Code', 'Fira Mono', monospace;
        opacity: 1;
        transition: opacity 0.5s ease-out;
    }
    
    .boot-screen.fade-out {
        opacity: 0;
    }
    
    .boot-scanlines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.08) 0px,
            rgba(0, 0, 0, 0.08) 1px,
            transparent 1px,
            transparent 3px
        );
        pointer-events: none;
        z-index: 1;
    }
    
    .boot-container {
        max-width: 700px;
        width: 90%;
        padding: 2rem;
        position: relative;
        z-index: 2;
    }
    
    .boot-header {
        font-size: 0.95rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(108, 112, 134, 0.3);
    }
    
    .boot-lines {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    
    .boot-line {
        font-size: 0.8rem;
        line-height: 1.5;
        white-space: pre;
    }
    
    @media (min-width: 1024px) {
        .boot-header {
            font-size: 1.1rem;
        }
        .boot-line {
            font-size: 0.9rem;
        }
    }
</style>
