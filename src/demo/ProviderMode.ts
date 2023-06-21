import { EthereumProvider } from '../types'

export function ProviderMode(init: (ethereum?: EthereumProvider) => void) {
  const connectedProviderButton = document.getElementById('connectedProviderButton') as HTMLButtonElement
  const standaloneModeButton = document.getElementById('standaloneModeButton') as HTMLButtonElement
  const toggleMode = () => {
    connectedProviderButton.classList.toggle('active')
    standaloneModeButton.classList.toggle('active')
  }

  connectedProviderButton.addEventListener('click', () => {
    init(window.ethereum)
    toggleMode()
  })

  standaloneModeButton.addEventListener('click', () => {
    init()
    toggleMode()
  })

  if (!window.ethereum) {
    toggleMode()
    connectedProviderButton.style.display = 'none'
  }
}
