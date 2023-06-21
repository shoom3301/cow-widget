import { CowSwapWidgetParams, CowSwapWidgetSettings } from './types'
import { JsonRpcManager } from './JsonRpcManager'
import { buildTradeAmountsQuery, buildWidgetPath, buildWidgetUrl } from './urlUtils'

const COW_SWAP_WIDGET_URL_UPDATE_KEY = 'cowSwapWidgetUrlUpdate'
const COW_SWAP_WIDGET_APP_UPDATE_KEY = 'cowSwapWidgetAppUpdate'

export type UpdateWidgetCallback = (params: CowSwapWidgetSettings) => void

export function cowSwapWidget(params: CowSwapWidgetParams, settings: CowSwapWidgetSettings): UpdateWidgetCallback {
  const { container, provider } = params
  const iframe = createIframe(params, settings)

  container.innerHTML = ''
  container.appendChild(iframe)

  const { contentWindow } = iframe

  if (!contentWindow) throw new Error('Iframe does not contain a window!')

  if (provider) {
    const jsonRpcManager = new JsonRpcManager(contentWindow)

    jsonRpcManager.onConnect(provider)
  }

  return (params: CowSwapWidgetSettings) => updateWidget(params, contentWindow)
}

function updateWidget(params: CowSwapWidgetSettings, contentWindow: Window) {
  const pathname = buildWidgetPath(params.urlParams)
  const search = buildTradeAmountsQuery(params.urlParams).toString()

  contentWindow.postMessage(
    {
      key: COW_SWAP_WIDGET_URL_UPDATE_KEY,
      pathname,
      search,
    },
    '*'
  )

  contentWindow.postMessage(
    {
      key: COW_SWAP_WIDGET_APP_UPDATE_KEY,
      params: params.appParams,
    },
    '*'
  )
}

function createIframe(params: CowSwapWidgetParams, settings: CowSwapWidgetSettings): HTMLIFrameElement {
  const { width, height } = params

  const iframe = document.createElement('iframe')

  iframe.src = buildWidgetUrl(settings.urlParams)
  iframe.width = `${width}px`
  iframe.height = `${height}px`
  iframe.style.border = '0'

  return iframe
}
