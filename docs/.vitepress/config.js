import path from 'path'

export default {
  title: 'Web3VitePress',
  description: 'Vite & Vue Powered Web3 Static Site Generator',
  vue: {
    reactivityTransform:  path.resolve(__dirname, 'theme'),
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/',  activeMatch: '/guide' },
      { text: 'Demo', link: '/demo-blog/index', activeMatch: '/demo-blog' },
      { text: 'Blog', link: 'https://medium.com/@web3hackerdao' },
      { text: 'About', link: '/about',  activeMatch: '/about' },
    ],
    footer: {
      message: '©2023 Web3VitePress All rights reserved.',
      copyright: 'Made with ❤️ by <a href="https://github.com/Web3HackerDAO" target="_blank">Web3HackerDAO</a>'
    },
    sidebar: {
      '/guide/': [{
        text: '',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Step 1: Write your blog', link: '/guide/1.write-your-blog' },
          { text: 'Step 2: Generate metadata', link: '/guide/2.generate-metadata' },
          { text: 'Step 3: Create article NFT', link: '/guide/3.create-token-for-your-article' },
        ]
      }],
      '/demo-blog/': [
      {
        text: '',
        items: [
          { text: 'Introduction', link: '/demo-blog/' },
          { text: 'CloneX', link: '/demo-blog/clonex' },
          { text: 'Doodle', link: '/demo-blog/doodle' },
        ]
        }
      ],
      },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Web3VitePress/Web3VitePress' },
      { icon: 'twitter', link: 'https://twitter.com/Web3HackerDAO' },
      { icon: 'discord', link: 'https://discord.gg/wpc9ZP3bBG' },
    ]
  }
}