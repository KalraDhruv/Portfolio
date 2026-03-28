import fs from 'fs';

const files = [
  'src/routes/app/+layout.svelte',
  'src/routes/components/Terminal.svelte'
];

const colorMap = {
  'bg-ctp-crust': 'bg-background',
  'bg-ctp-base': 'bg-background',
  'bg-ctp-surface0': 'bg-muted',
  'bg-ctp-surface1': 'bg-muted',
  'bg-ctp-surface2': 'bg-muted',
  'bg-ctp-overlay0': 'bg-muted', 
  'bg-ctp-overlay1': 'bg-muted',
  'bg-ctp-overlay2': 'bg-border',
  
  // text
  'text-ctp-text': 'text-foreground',
  'text-ctp-subtext0': 'text-foreground opacity-80',
  'text-ctp-surface1': 'text-foreground opacity-60',
  'text-ctp-surface2': 'text-background', 
  'text-ctp-overlay0': 'text-foreground opacity-50',
  'text-ctp-overlay1': 'text-foreground opacity-60',
  
  // accents
  'text-ctp-green': 'text-accent',
  'text-ctp-blue': 'text-accent',
  'text-ctp-lavender': 'text-accent',
  'text-ctp-mauve': 'text-accent',
  'text-ctp-sky': 'text-accent',
  'text-ctp-peach': 'text-accent',
  'text-ctp-yellow': 'text-accent',
  'text-ctp-pink': 'text-accent',
  'text-ctp-flamingo': 'text-accent',
  'text-ctp-rosewater': 'text-accent',
  
  'bg-ctp-green': 'bg-accent',
  'bg-ctp-blue': 'bg-accent',
  'bg-ctp-lavender': 'bg-accent',
  
  // borders
  'border-ctp-crust': 'border-background',
  'border-ctp-base': 'border-background',
  'border-ctp-text': 'border-border',
  'border-ctp-green': 'border-accent',
  'border-ctp-overlay0': 'border-border',
  
  'ring-ctp-overlay0': 'ring-border',
  'hover:border-ctp-yellow': 'hover:border-accent',
  'hover:ring-ctp-peach': 'hover:ring-accent',

  'group-hover:text-ctp-green': 'group-hover:text-accent',
  'border-b-ctp-text': 'border-b-border',
  'hover:text-ctp-blue': 'hover:text-accent',
  'hover:text-ctp-surface2': 'hover:text-muted',

  // custom variables in css
  'var(--ctp-mauve, #cba6f7)': 'var(--accent)',
  'var(--ctp-pink, #f5c2e7)': 'var(--accent)',
  'var(--ctp-flamingo, #f2cdcd)': 'var(--accent)',
  'var(--ctp-rosewater, #f5e0dc)': 'var(--accent)',
  'var(--ctp-blue, #89b4fa)': 'var(--accent)',
  'var(--ctp-sky, #89dceb)': 'var(--accent)',
  'var(--ctp-lavender, #b4befe)': 'var(--accent)',
  'var(--ctp-subtext0, #a6adc8)': 'var(--foreground)',
  'var(--ctp-overlay0, #6c7086)': 'var(--border)',
  'var(--ctp-peach, #fab387)': 'var(--accent)',
  'var(--ctp-green, #a6e3a1)': 'var(--accent)',

  'from-ctp-surface0': 'from-muted'
};

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [key, value] of Object.entries(colorMap)) {
      content = content.replaceAll(key, value);
    }
    fs.writeFileSync(file, content);
  }
});
console.log("Done replacing colors.");
