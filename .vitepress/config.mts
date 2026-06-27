import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hans Schenker Projects",
  description: "A list of Rxjs tutorial projects",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hansschenker' }
    ],

    footer: {
      message: 'Assisted by <a href="https://www.anthropic.com" target="_blank" rel="noopener"><img src="https://claude.ai/apple-touch-icon.png" width="20" height="20" style="vertical-align:middle;margin:0 5px 2px;border-radius:4px">Anthropic Claude</a>',
      copyright: '© 2024 Hans Schenker'
    }
  }
})
