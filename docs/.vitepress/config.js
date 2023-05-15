import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '3D Mockup',
  description: '📱 A 3D phone mockup component to showcase your apps',
  base: '/three-d-mockup/',
  lang: 'en-US',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Video as screen', link: '/guide/video-as-screen' },
        ]
      },
    ],
    footer: {
      message: 'Released under the GPL-3.0 license.',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/anatolykopyl/three-d-mockup'
      }
    ],
    editLink: {
      pattern: 'https://github.com/anatolykopyl/three-d-mockup/edit/master/docs/:path'
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'three-d-mockup'
      }
    }
  }
})
