import Web3VitePress from './abis/Web3VitePress.json'

const chainIdMap = {
  'vitepress': '0x7ab7',
}
const gitBranch = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF
console.log('====> gitBranch :', gitBranch)
export const CHAIN_ID = chainIdMap[gitBranch] || '0x7ab7'
export const CHAIN_MAP = {
  '0x5': {
    chainId: '0x5',
    chainName: 'Goerli Test Network',
    blockExplorerUrls: ['https://goerli.etherscan.io'],
    nativeCurrency: { name: 'GeorliETH', symbol: 'gETH', decimals: 18 },
    rpcUrls: ['https://goerli.infura.io/v3/'],
  },
  '0x89': {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    blockExplorerUrls: ['https://polygonscan.com/'],
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com/', 'https://rpc-mainnet.maticvigil.com/'],
  },
  '0x507': {
    chainId: '0x507',
    chainName: 'Moonbase Alpha',
    blockExplorerUrls: ['https://moonbase.moonscan.io/'],
    nativeCurrency: { name: 'DEV', symbol: 'DEV', decimals: 18 },
    rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
  },
  '0x1c': {
    chainId: '0x1c',
    chainName: 'Boba Testnet',
    nativeCurrency: { name: 'ETH', symbol: 'bETH', decimals: 18 },
    rpcUrls: ['https://rinkeby.boba.network/'],
    blockExplorerUrls: ['https://blockexplorer.rinkeby.boba.network/'],
  },
  '0xaef3': {
    chainId: '0xaef3',
    chainName: 'Alfajores Testnet',
    nativeCurrency: { name: 'Alfajores Celo', symbol: 'A-CELO', decimals: 18 },
    rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
    blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org/'],
  },
  '0x66eeb': {
    chainId: '0x66eeb',
    chainName: 'Arbitrum Testnet',
    nativeCurrency: { name: 'Arbitrum Testnet', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://testnet.arbiscan.io/'],
  },
  '0x116e9': {
    chainId: '0x116e9',
    chainName: 'Godwoken Testnet',
    nativeCurrency: { name: 'Godwoken Testnet', symbol: 'CKB', decimals: 18 },
    rpcUrls: ['https://godwoken-testnet-v1.ckbapp.dev'],
    blockExplorerUrls: ['https://v1.testnet.gwscan.com/'],
  },
  '0x13881': {
    chainId: '0x13881',
    chainName: 'Polygon Testnet Mumbai',
    blockExplorerUrls: [
      'https://mumbai.polygonscan.com/',
    ],
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: [
      'https://matic-mumbai.chainstacklabs.com',
      'https://rpc-mumbai.maticvigil.com',
      'https://matic-testnet-archive-rpc.bwarelabs.com',
    ],
  },
}

export const CHAIN_CONTRACT_MAP = {
  Web3VitePress: {
    '0x7ab7': '0xc6eD496eaFAaCD3254adD3e62Cd3f1D87b8d89Ac',
  },
}

export const CHAIN_CONTRACT_ABI_MAP = {
  Web3VitePress
}
