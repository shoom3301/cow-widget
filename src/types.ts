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

export interface EthereumProvider {
  request<T>(params: JsonRpcRequest): Promise<T>
  enable(): Promise<void>
}

export type CowSwapWidgetEnv = 'local' | 'prod'

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
  tradeAssets?: TradeAssets
}

export interface CowSwapWidgetParams {
  urlParams: CowSwapWidgetUrlParams
  width: number
  height: number
  container: HTMLElement
  provider: EthereumProvider
}
