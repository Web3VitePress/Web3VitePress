import path from 'path'
import VueMacros from 'unplugin-vue-macros/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vitepress'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  title: 'Web3VitePress',
  description: 'Vite & Vue Powered Web3 Static Site Generator',
  ignoreDeadLinks: 'localhostLinks',
  vue: {
    reactivityTransform:  path.resolve(__dirname, 'theme'),
  },
  vite: {
    define: {
      'process.env': {},
      global: {},
    },
    plugins: [
      VueMacros(),
      // nodePolyfills({
      //   include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
      // }),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
          {
            'lodash': [
              'isEqual',
              'uniq',
              'random',
              'remove',
              'merge',
              'forEach',
              'get',
              'reverse',
              'filter',
              'upperFirst',
              'take',
              'shuffle',
            ],
            'pinia': [
              'acceptHMRUpdate',
              'defineStore',
              'storeToRefs',
            ],
            'villus': [
              'useQuery',
            ],
            'graphql-tag': [
              'gql',
            ],
            '@headlessui/vue': [
              'TransitionRoot',
              'TransitionChild',
              'Dialog',
              'DialogPanel',
              'DialogOverlay',
              'DialogTitle',
              'DialogDescription',
              'Menu',
              'MenuButton',
              'MenuItem',
              'MenuItems',
              'TabGroup',
              'TabList',
              'Tab',
              'TabPanels',
              'TabPanel',
              'Combobox',
              'ComboboxInput',
              'ComboboxButton',
              'ComboboxOptions',
              'ComboboxOption',
            ],
          },
        ],
        dirs: [
        ],
        dts: '../auto-imports.d.ts',
        vueTemplate: true,
      }),
      Components({
        resolvers: [
          IconsResolver({
            prefix: false,
            // enabledCollections: ['carbon']
          }),
          HeadlessUiResolver({ prefix: '' }),
        ],
        dts: '../components.d.ts',
      }),
      Icons(),
    ],
    build: {
      transpile: ['@heroicons/vue']
    }
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
          { text: 'Step 2: Generate NFT', link: '/guide/2.generate-nft-for-your-article' },
          { text: 'Step 3: Mint NFT', link: '/guide/3.mint-nft-in-action' },
        ]
      }],
      '/demo-blog/': [
      {
        text: '',
        items: [
          { text: 'Introduction', link: '/demo-blog/' },
          { text: 'CloneX', link: '/demo-blog/clonex' },
          { text: 'Doodle', link: '/demo-blog/doodle' },
          { text: 'New Blog', link: '/demo-blog/new-blog' },
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
})