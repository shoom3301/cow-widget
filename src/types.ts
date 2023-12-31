declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

export interface JsonRpcRequest {
  id: number
  method: string
  params: unknown[]
}

// https://eips.ethereum.org/EIPS/eip-1193
export interface EthereumProvider {
  on(event: string, args: unknown): void
  request<T>(params: JsonRpcRequest): Promise<T>
  enable(): Promise<void>
}

export type CowSwapWidgetEnv = 'local' | 'prod'

export type CowSwapTheme = 'dark' | 'light'

interface TradeAsset {
  asset: string
  amount?: string
}

export interface TradeAssets {
  sell: TradeAsset
  buy: TradeAsset
}

export interface CowSwapWidgetUrlParams {
  env: CowSwapWidgetEnv
  chainId: number
  tradeType: string
  tradeAssets?: TradeAssets
  theme?: CowSwapTheme
}

export interface CowSwapWidgetAppParams {
  logoUrl?: string
  hideLogo?: boolean
  hideNetworkSelector?: boolean
}

export interface CowSwapWidgetSettings {
  urlParams: CowSwapWidgetUrlParams
  appParams: CowSwapWidgetAppParams
}

export interface CowSwapWidgetParams {
  width: number
  height: number
  container: HTMLElement
  provider?: EthereumProvider
}
