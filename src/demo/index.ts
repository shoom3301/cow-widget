import { cowSwapWidget, CowSwapWidgetUrlParams } from '../index'
import { DemoPage } from './DemoPage'

const demoPage = DemoPage()
document.body.appendChild(demoPage)

const iframeContainer = document.getElementById('widgetContainer') as HTMLElement
const settingsForm = document.getElementById('settingsForm') as HTMLFormElement

if (!window.ethereum) {
  alert('Please, enable Metamask extension')

  throw new Error('Injected wallet is not detected')
}

const urlParams: CowSwapWidgetUrlParams = {
  env: 'local',
  chainId: 1,
  theme: 'light',
  tradeType: 'swap',
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

const updateWidget = cowSwapWidget({
  urlParams,
  width: 400,
  height: 640,
  container: iframeContainer,
  provider: window.ethereum,
})

function applySettings() {
  const formState = Object.fromEntries(new FormData(settingsForm) as never)

  updateWidget({
    env: formState.env,
    chainId: formState.chainId,
    theme: formState.theme,
    tradeType: formState.tradeType,
    tradeAssets: {
      sell: {
        asset: formState['tradeAssets.sell.asset'],
        amount: formState['tradeAssets.sell.amount'],
      },
      buy: {
        asset: formState['tradeAssets.buy.asset'],
        amount: formState['tradeAssets.buy.amount'],
      },
    },
  })
}

settingsForm.addEventListener('submit', (event) => {
  event.preventDefault()
  applySettings()
})

settingsForm.addEventListener('change', (event) => {
  event.preventDefault()
  applySettings()
})
