import { CowSwapWidgetEnv } from './types'
import { COWSWAP_URLS } from './consts'
import { EthereumJsonRpcManager } from './EthereumJsonManager'

export interface CowSwapWidgetParams {
  env: CowSwapWidgetEnv
  chainId: number
  width: number
  height: number
}

export function initCowSwapWidget(params: CowSwapWidgetParams) {
  const { env, width, height, chainId } = params
  const url = COWSWAP_URLS[env]
  const route = `/#/${chainId}/swap/widget/WETH`
  const iframe = document.createElement('iframe')

  iframe.src = url + route
  iframe.width = `${width}px`
  iframe.height = `${height}px`

  document.body.innerHTML = ''
  document.body.appendChild(iframe)

  // TODO
  if (!iframe.contentWindow || !window.ethereum) return

  const manager = new EthereumJsonRpcManager(iframe.contentWindow)

  manager.onConnect(window.ethereum)
}
