import { CowSwapWidgetParams } from './types'
import { EthereumJsonRpcManager } from './EthereumJsonManager'
import { CowSwapWidgetManager } from './CowSwapWidgetManager'
import { buildWidgetUrl } from './urlUtils'

export function initCowSwapWidget(params: CowSwapWidgetParams): CowSwapWidgetManager {
  const { container, provider } = params
  const iframe = createIframe(params)

  container.innerHTML = ''
  container.appendChild(iframe)

  if (!iframe.contentWindow) throw new Error('Iframe does not contain a window!')

  const jsonRpcManager = new EthereumJsonRpcManager(iframe.contentWindow)
  const widgetManager = new CowSwapWidgetManager(iframe.contentWindow)

  jsonRpcManager.onConnect(provider)

  return widgetManager
}

function createIframe(params: CowSwapWidgetParams): HTMLIFrameElement {
  const { width, height } = params

  const iframe = document.createElement('iframe')

  iframe.src = buildWidgetUrl(params.urlParams)
  iframe.width = `${width}px`
  iframe.height = `${height}px`

  return iframe
}
