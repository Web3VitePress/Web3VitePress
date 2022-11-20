
export default {
  title: 'Web3VitePress',
  description: 'Publish your article as new NFT, and sell ERC1155 NFT token via FVM',
  vue: {
    reactivityTransform: true
  },
  themeConfig: {
    nav: [
      { text: 'Blog', link: '/blog',  activeMatch: '/config/' },
    ],
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
      { icon: 'github', link: 'https://github.com/NftTopBest/Web3VitePress' },
      { icon: 'twitter', link: 'https://twitter.com/web3hackerninja' },
      { icon: 'discord', link: 'https://discord.gg/wpc9ZP3bBG' },
    ]
  }
}