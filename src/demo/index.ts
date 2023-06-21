import { cowSwapWidget, CowSwapWidgetAppParams, CowSwapWidgetUrlParams } from '../index'
import { DemoPage } from './DemoPage'
import { Settings } from './Settings'

const demoPage = DemoPage()
document.body.appendChild(demoPage)

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

const appParams: CowSwapWidgetAppParams = {}

const updateWidget = cowSwapWidget(
  {
    width: 400,
    height: 640,
    container: document.getElementById('widgetContainer') as HTMLElement,
    provider: window.ethereum,
  },
  { urlParams, appParams }
)

Settings(updateWidget)
