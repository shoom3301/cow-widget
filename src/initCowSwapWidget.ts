import { CowSwapWidgetEnv, EthereumProvider, TradeAssets } from './types'
import { COWSWAP_URLS } from './consts'
import { EthereumJsonRpcManager } from './EthereumJsonManager'

export interface CowSwapWidgetParams {
  env: CowSwapWidgetEnv
  chainId: number
  width: number
  height: number
  container: HTMLElement
  provider: EthereumProvider
  tradeAssets?: TradeAssets
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
  const { width, height } = params

  const iframe = document.createElement('iframe')

  iframe.src = buildIframeUrl(params)
  iframe.width = `${width}px`
  iframe.height = `${height}px`

  return iframe
}

function buildIframeUrl(params: CowSwapWidgetParams): string {
  const { env, chainId, tradeAssets } = params

  const url = COWSWAP_URLS[env]
  const assetsPath = tradeAssets ? `${tradeAssets.sell.asset}/${tradeAssets.buy.asset}` : ''
  const route = `/#/${chainId}/swap/widget/${assetsPath}`

  const query = tradeAssets ? buildTradeAmountsQuery(tradeAssets) : ''

  return url + route + (query ? '?' + query : '')
}

function buildTradeAmountsQuery({ sell, buy }: TradeAssets): URLSearchParams {
  const query = new URLSearchParams()

  if (sell.amount) {
    query.append('sellAmount', sell.amount)
  }

  if (buy.amount) {
    query.append('buyAmount', buy.amount)
  }

  return query
}
