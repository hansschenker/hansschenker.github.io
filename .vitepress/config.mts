import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hans Schenker Projects",
  description: "A list of Rxjs tutorial projects",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects/' }
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hansschenker' }
    ],

    footer: {
      message: 'Assisted by <a href="https://www.anthropic.com" target="_blank" rel="noopener"><img src="https://avatars.githubusercontent.com/u/76263028?s=20&v=4" width="18" height="18" style="vertical-align:middle;margin:0 4px 2px;border-radius:50%">Anthropic Claude</a>',
      copyright: '© 2024 Hans Schenker'
    }
  }
})
