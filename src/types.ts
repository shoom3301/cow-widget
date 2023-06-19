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

export enum CowSwapWidgetEnv {
  local = 'local',
  prod = 'prod',
}
