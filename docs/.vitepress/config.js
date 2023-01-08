import path from 'path'

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
    reactivityTransform:  path.resolve(__dirname, 'theme'),
  },
  themeConfig: {
    logo: '/logo.png',
    siteTitle: false,
    localeLinks: {
      text: 'English',
      items: [
        { text: '中文', link: '/zh/', activeMatch: '/zh/'},
      ]
    },
    nav: [
      // { text: 'Discover', link: '/discover',  activeMatch: '/discover' },
      { text: 'Blog', link: 'https://medium.com/@web3hackerdao' },
      { text: 'Guide', link: '/guide/getting-started',  activeMatch: '/guide' },
      { text: 'Pricing', link: '/pricing',  activeMatch: '/pricing' },
      { text: 'About', link: '/about',  activeMatch: '/about' },
    ],
    footer: {
      message: '©2023 SellX3.com All rights reserved.',
      copyright: 'Made with ❤️ by <a href="https://github.com/Web3HackerDAO" target="_blank">Web3HackerDAO</a>'
    },
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Web3VitePress/Web3VitePress' },
      { icon: 'twitter', link: 'https://twitter.com/Web3HackerDAO' },
      { icon: 'discord', link: 'https://discord.gg/wpc9ZP3bBG' },
    ],
    locales: {
      '/zh/': {
        localeLinks: {
          text: '中文',
          items: [
            { text: 'English', link: '/', activeMatch: '/' },
          ]
        },
        nav: [
          // { text: '发现', link: '/zh/discover',  activeMatch: '/zh/discover' },
          { text: '博客', link: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk0NDM5NzkwNg==&action=getalbum&album_id=2741406345877012482&scene=173&from_msgid=2247483826&from_itemidx=1&count=3&nolastread=1#wechat_redirect'},
          { text: '指南', link: '/zh/guide/getting-started',  activeMatch: '/zh/guide' },
          { text: '价格', link: '/zh/pricing',  activeMatch: '/zh/pricing' },
          { text: '关于', link: '/zh/about',  activeMatch: '/zh/about' },
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '开始', link: '/zh/guide/getting-started' },
            ]
          }
        ],
        footer: {
          message: '©2023 SellX3.com 版权所有。',
          copyright: '由 <a href="https://github.com/Web3HackerDAO" target="_blank">Web3HackerDAO</a> 带着 ❤️  制作'
        },
      }
    }
  }
}