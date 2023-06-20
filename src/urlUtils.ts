import { CowSwapWidgetUrlParams, TradeAssets } from './types'
import { COWSWAP_URLS } from './consts'

export function buildWidgetUrl(params: CowSwapWidgetUrlParams): string {
  const host = COWSWAP_URLS[params.env]
  const path = buildWidgetPath(params)
  const query = params.tradeAssets ? buildTradeAmountsQuery(params.tradeAssets) : ''

  return host + '/#' + path + '?' + query
}

export function buildWidgetPath(params: CowSwapWidgetUrlParams): string {
  const { chainId, tradeAssets } = params

  const assetsPath = tradeAssets
    ? [tradeAssets.sell.asset, tradeAssets.buy.asset].map(encodeURIComponent).join('/')
    : ''

  return `/${chainId}/swap/widget/${assetsPath}`
}

export function buildTradeAmountsQuery({ sell, buy }: TradeAssets): URLSearchParams {
  const query = new URLSearchParams()

  if (sell.amount) {
    query.append('sellAmount', sell.amount)
  }

  if (buy.amount) {
    query.append('buyAmount', buy.amount)
  }

  return query
}
