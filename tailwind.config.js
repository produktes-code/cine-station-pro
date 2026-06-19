/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "app-bg": "#111111",
        "app-panel": "#1a1a1a",
        "app-input": "#0d0d0d",
        "app-border": "#2a2a2a",
        "app-accent": "#e11d48",
        "app-success": "#22c55e",
        "app-success": "#22c55e",
        "on-surface-variant": "#a3a3a3",
        "on-surface": "#e5e2e1",
        "surface-container-low": "#111114",
        "primary": "#10b981",
        "secondary": "#3b82f6"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "lg": "24px",
        "md": "16px",
        "xs": "4px",
        "xl": "32px",
        "gutter": "1px",
        "unit": "4px",
        "panel-padding": "12px",
        "sm": "8px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "label-md": ["JetBrains Mono", "monospace"],
        "label-sm": ["JetBrains Mono", "monospace"],
        "mono-data": ["JetBrains Mono", "monospace"],
        "body-md": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-md": ["JetBrains Mono", "monospace"],
        "body-sm": ["Inter", "sans-serif"],
        "headline-sm": ["JetBrains Mono", "monospace"],
        "headline-lg": ["JetBrains Mono", "monospace"],
        "meta-code": ["JetBrains Mono", "monospace"],
        "label-caps": ["Inter", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "label-sm": ["10px", { "lineHeight": "14px", "letterSpacing": "0.08em", "fontWeight": "500" }],
        "mono-data": ["11px", { "lineHeight": "14px", "fontWeight": "400" }],
        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "headline-md": ["18px", { "lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "body-sm": ["12px", { "lineHeight": "16px", "fontWeight": "400" }],
        "headline-sm": ["14px", { "lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "600" }],
        "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
      }
    },
  },
  plugins: [],
}
