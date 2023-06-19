import { initCowSwapWidget } from './cowSwapWidget'
import { CowSwapWidgetEnv } from './types'

initCowSwapWidget({
  env: CowSwapWidgetEnv.local,
  width: 400,
  height: 600,
  chainId: 1,
})
