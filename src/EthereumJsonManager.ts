import { EthereumProvider, JsonRpcRequest } from './types'

export class EthereumJsonRpcManager {
  ethereumProvider: EthereumProvider | null = null

  requests: { [key: string]: JsonRpcRequest } = {}

  constructor(private contentWindow: Window) {
    window.addEventListener('message', this.processEvent)
  }

  disconnect() {
    this.ethereumProvider = null
    window.removeEventListener('message', this.processEvent)
  }

  onConnect(ethereumProvider: EthereumProvider) {
    this.ethereumProvider = ethereumProvider

    Object.keys(this.requests).forEach((key) => {
      this.processRequest(this.requests[key])
    })

    this.requests = {}
  }

  processRequest(request: JsonRpcRequest) {
    if (!this.ethereumProvider) return

    const request$ =
      request.method === 'enable' //
        ? this.ethereumProvider.enable()
        : this.ethereumProvider.request(request)

    request$
      .then((result) => {
        this.contentWindow.postMessage(
          {
            jsonrpc: '2.0',
            id: request.id,
            result,
          },
          '*'
        )
      })
      .catch((error) => {
        this.contentWindow.postMessage(
          {
            jsonrpc: '2.0',
            id: request.id,
            error,
          },
          '*'
        )
      })
  }

  private processEvent = (event: MessageEvent) => {
    if (event.data.jsonrpc === '2.0') {
      if (this.ethereumProvider) {
        this.processRequest(event.data)
      } else {
        this.requests[event.data.id] = event.data
      }
    }
  }
}
