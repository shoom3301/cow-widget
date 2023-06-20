import { CowSwapWidgetParams, CowSwapWidgetUrlParams } from './types'
import { JsonRpcManager } from './JsonRpcManager'
import { buildTradeAmountsQuery, buildWidgetPath, buildWidgetUrl } from './urlUtils'

const COW_SWAP_WIDGET_KEY = 'cowSwapWidget'

type UpdateWidgetCallback = (params: CowSwapWidgetUrlParams) => void

export function initCowSwapWidget(params: CowSwapWidgetParams): UpdateWidgetCallback {
  const { container, provider } = params
  const iframe = createIframe(params)

  container.innerHTML = ''
  container.appendChild(iframe)

  const { contentWindow } = iframe

  if (!contentWindow) throw new Error('Iframe does not contain a window!')

  if (provider) {
    const jsonRpcManager = new JsonRpcManager(contentWindow)

    jsonRpcManager.onConnect(provider)
  }

  return (params: CowSwapWidgetUrlParams) => updateWidget(params, contentWindow)
}

function updateWidget(params: CowSwapWidgetUrlParams, contentWindow: Window) {
  const pathname = buildWidgetPath(params)
  const search = buildTradeAmountsQuery(params).toString()

  contentWindow.postMessage(
    {
      key: COW_SWAP_WIDGET_KEY,
      pathname,
      search,
    },
    '*'
  )
}

function createIframe(params: CowSwapWidgetParams): HTMLIFrameElement {
  const { width, height } = params

  const iframe = document.createElement('iframe')

  iframe.src = buildWidgetUrl(params.urlParams)
  iframe.width = `${width}px`
  iframe.height = `${height}px`

  return iframe
}
