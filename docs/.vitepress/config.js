
export default {
  title: 'SellX3',
  description: 'Buidlers now can Sell anything in Web3 Verse with easy and freedom',
  vue: {
    reactivityTransform: './theme',
  },
  themeConfig: {
    nav: [
      { text: 'Blog', link: '/blog',  activeMatch: '/config/' },
    ],
    footer: {
      message: 'Copyright © 2023 SellX3.com. All rights reserved.',
      copyright: 'Made with ❤️ by <a href="https://github.com/Web3HackerDAO" target="_blank">Web3HackerDAO</a>'
    },
    sidebar: [
      {
        text: 'Blog',
        items: [
          { text: 'Getting Started', link: '/blog/getting-started' },
          { text: 'Guide', link: '/blog/guide' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Web3VitePress/Web3VitePress' },
      { icon: 'twitter', link: 'https://twitter.com/web3hackerninja' },
      { icon: 'discord', link: 'https://discord.gg/wpc9ZP3bBG' },
    ]
  }
}