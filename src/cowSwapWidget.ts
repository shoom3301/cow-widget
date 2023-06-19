import { CowSwapWidgetEnv } from './types'
import { COWSWAP_URLS } from './consts'

export interface CowSwapWidgetParams {
  env: CowSwapWidgetEnv
  width: number
  height: number
}

export function initCowSwapWidget(params: CowSwapWidgetParams) {
  const { env, width, height } = params
  const url = COWSWAP_URLS[env]
  const iframe = document.createElement('iframe')

  iframe.src = url
  iframe.width = `${width}px`
  iframe.height = `${height}px`

  document.body.innerHTML = ''
  document.body.appendChild(iframe)
}
