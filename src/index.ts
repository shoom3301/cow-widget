import { initCowSwapWidget } from './initCowSwapWidget'
import { CowSwapWidgetUrlParams } from './types'

const settingsTextarea = document.createElement('textarea')

settingsTextarea.style.width = '400px'
settingsTextarea.style.height = '200px'
document.body.appendChild(settingsTextarea)

const iframeContainer = document.createElement('div')
document.body.appendChild(iframeContainer)

if (!window.ethereum) {
  alert('Please, enable Metamask extension')

  throw new Error('Injected wallet is not detected')
}

const urlParams: CowSwapWidgetUrlParams = {
  env: 'local',
  chainId: 1,
  theme: 'light',
  tradeAssets: {
    sell: {
      // asset: '0x543ff227f64aa17ea132bf9886cab5db55dcaddf',
      asset: 'COW',
      amount: '1200',
    },
    buy: {
      asset: 'WETH',
    },
  },
}

const widget = initCowSwapWidget({
  urlParams,
  width: 400,
  height: 600,
  container: iframeContainer,
  provider: window.ethereum,
})

settingsTextarea.value = JSON.stringify(urlParams, null, 4)

settingsTextarea.addEventListener('blur', () => {
  const newParams = JSON.parse(settingsTextarea.value)

  widget.update(newParams)
})
