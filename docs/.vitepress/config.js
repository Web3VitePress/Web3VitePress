
export default {
  title: 'SellX3',
  description: 'Buidlers now can Sell anything in Web3 Verse with easy and freedom',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'SellX3',
      description: 'Buidlers now can Sell anything in Web3 Verse with easy and freedom'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'SellX3',
      description: '创造者可以很简单自由的在 Web3 宇宙中售卖任何创意'
    }
  },
  vue: {
    reactivityTransform: './theme',
  },
  themeConfig: {
    logo: '/logo.png',
    siteTitle: false,
    localeLinks: {
      items: [
        { text: 'English', link: '/' },
        { text: '中文', link: '/zh/'},
      ]
    },
    nav: [
      { text: 'Discover', link: '/discover',  activeMatch: '/discover' },
      { text: 'Blog', link: '/blog',  activeMatch: '/blog' },
      { text: 'Guide', link: '/guide',  activeMatch: '/guide' },
      { text: 'Pricing', link: '/pricing',  activeMatch: '/pricing' },
      { text: 'About', link: '/about',  activeMatch: '/about' },
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