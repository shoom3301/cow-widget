import { CowSwapWidgetEnv, EthereumProvider } from './types'
import { COWSWAP_URLS } from './consts'
import { EthereumJsonRpcManager } from './EthereumJsonManager'

export interface CowSwapWidgetParams {
  env: CowSwapWidgetEnv
  chainId: number
  width: number
  height: number
  container: HTMLElement
  provider: EthereumProvider
}

export function initCowSwapWidget(params: CowSwapWidgetParams) {
  const { container, provider } = params
  const iframe = createIframe(params)

  container.innerHTML = ''
  container.appendChild(iframe)

  if (!iframe.contentWindow) throw new Error('Iframe does not contain a window!')

  const jsonRpcManager = new EthereumJsonRpcManager(iframe.contentWindow)

  jsonRpcManager.onConnect(provider)
}

function createIframe(params: CowSwapWidgetParams): HTMLIFrameElement {
  const { env, width, height, chainId } = params
  const url = COWSWAP_URLS[env]
  const route = `/#/${chainId}/swap/widget/WETH`
  const iframe = document.createElement('iframe')

  iframe.src = url + route
  iframe.width = `${width}px`
  iframe.height = `${height}px`

  return iframe
}
