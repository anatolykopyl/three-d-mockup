import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '3D Mockup',
  description: '📱 A 3D phone mockup component to showcase your apps',
  base: '/three-d-mockup/',
  lang: 'en-US',
  lastUpdated: true,
  themeConfig: {  
    footer: {
      message: 'Released under the GPL-3.0 license.',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/anatolykopyl/three-d-mockup'
      }
    ]
  },
  // vite: {
  //   plugins: [
  //     vue({
  //       template: {
  //         compilerOptions: {
  //           isCustomElement: (tag) => tag.includes('-')
  //         }
  //       }
  //     })
  //   ]
  // }
})
