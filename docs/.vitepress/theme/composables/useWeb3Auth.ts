import { init, useOnboard } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from "ethers";
import { CHAIN_CONTRACT_MAP, CHAIN_CONTRACT_ABI_MAP } from '../web3/CHAIN'

// const chainId = 31415
const chainId = '0x7ab7'
init({
  wallets: [injectedModule()],
  accountCenter: {
    desktop: {
      position: 'bottomRight',
      enabled: true,
      minimal: true
    },
    mobile: {
      position: 'bottomRight',
      enabled: true,
      minimal: true
    }
  },
  chains: [
    {
      id: chainId,
      token: 'tFIL',
      label: 'Filecoin - Wallaby testnet',
      rpcUrl: 'https://wallaby.node.glif.io/rpc/v1',
      blockExplorerUrl: 'https://wallaby.filfox.info'
    }
  ]
})

export const parseEther = val => ethers.utils.parseEther(val)


export const useWeb3Auth = () => {
  const { connectWallet, connectingWallet, setChain, connectedChain, connectedWallet } = $(useOnboard())

  const doConnect = async () => {
    if (connectingWallet) return

    await connectWallet()
    await setChain({ chainId })
  }

  const ethersProvider = $computed(() => {
    if (!connectedWallet) {
      return null
    }
    return new ethers.providers.Web3Provider(
      connectedWallet.provider,
      'any'
    )
  })

  const walletAddress = $computed(() => {
    if (!ethersProvider) return null
    return ethersProvider.provider.selectedAddress
  })

  const initContract = (key, isWrite = false) => {
    const contractAddress = CHAIN_CONTRACT_MAP[key][chainId]
    const contractAbi = CHAIN_CONTRACT_ABI_MAP[key]

    if (!isWrite)
      return new ethers.Contract(contractAddress, contractAbi, ethersProvider);

    const signer = ethersProvider.getSigner();
    return new ethers.Contract(contractAddress, contractAbi, signer);
  };

  const previouslyConnectedWallets = JSON.parse(
    window.localStorage.getItem('alreadyConnectedWallets')
  )

  if (previouslyConnectedWallets.length > 0) {
    connectWallet({
      autoSelect: { label: previouslyConnectedWallets[0], disableModals: true }
    })
  }

  return $$({
    parseEther,
    connectedChain,
    connectedWallet,
    walletAddress,
    doConnect,
    initContract,
  })
};
