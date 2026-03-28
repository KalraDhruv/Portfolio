/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      }
    },
  },
  plugins: [],
}

