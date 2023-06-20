import { initCowSwapWidget } from './initCowSwapWidget'

const iframeContainer = document.createElement('div')
document.body.appendChild(iframeContainer)

if (!window.ethereum) {
  alert('Please, enable Metamask extension')

  throw new Error('Injected wallet is not detected')
}

initCowSwapWidget({
  env: 'local',
  width: 400,
  height: 600,
  chainId: 1,
  container: iframeContainer,
  provider: window.ethereum,
})
