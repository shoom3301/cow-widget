import { CowSwapWidgetUrlParams } from './types'
import { buildTradeAmountsQuery, buildWidgetPath } from './urlUtils'

const COW_SWAP_WIDGET_KEY = 'cowSwapWidget'

export class CowSwapWidgetManager {
  constructor(private contentWindow: Window) {}

  update(params: CowSwapWidgetUrlParams) {
    const pathname = buildWidgetPath(params)
    const search = params.tradeAssets ? buildTradeAmountsQuery(params.tradeAssets).toString() : ''

    this.contentWindow.postMessage(
      {
        key: COW_SWAP_WIDGET_KEY,
        pathname,
        search,
      },
      '*'
    )
  }
}
