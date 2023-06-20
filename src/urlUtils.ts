import { CowSwapWidgetUrlParams } from './types'
import { COWSWAP_URLS } from './consts'

export function buildWidgetUrl(params: CowSwapWidgetUrlParams): string {
  const host = COWSWAP_URLS[params.env]
  const path = buildWidgetPath(params)
  const query = buildTradeAmountsQuery(params)

  return host + '/#' + path + '?' + query
}

export function buildWidgetPath(params: CowSwapWidgetUrlParams): string {
  const { chainId, tradeAssets } = params

  const assetsPath = tradeAssets
    ? [tradeAssets.sell.asset, tradeAssets.buy.asset].map(encodeURIComponent).join('/')
    : ''

  return `/${chainId}/swap/widget/${assetsPath}`
}

export function buildTradeAmountsQuery(params: CowSwapWidgetUrlParams): URLSearchParams {
  const { tradeAssets, theme } = params
  const query = new URLSearchParams()

  if (tradeAssets) {
    const { sell, buy } = tradeAssets

    if (sell.amount) {
      query.append('sellAmount', sell.amount)
    }

    if (buy.amount) {
      query.append('buyAmount', buy.amount)
    }
  }

  if (theme) {
    query.append('theme', theme)
  }

  return query
}
