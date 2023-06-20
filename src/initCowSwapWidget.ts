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

  if (provider) {
    const jsonRpcManager = new EthereumJsonRpcManager(iframe.contentWindow)

    jsonRpcManager.onConnect(provider)
  }

  return new CowSwapWidgetManager(iframe.contentWindow)
}

function createIframe(params: CowSwapWidgetParams): HTMLIFrameElement {
  const { width, height } = params

  const iframe = document.createElement('iframe')

  iframe.src = buildWidgetUrl(params.urlParams)
  iframe.width = `${width}px`
  iframe.height = `${height}px`

  return iframe
}
