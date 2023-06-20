// eslint-disable-next-line max-lines-per-function
export function DemoPage(): HTMLElement {
  const content = `
    <div>
      <style>
        body {
            min-height: 100vh;
            margin: 0;
            background: rgb(5, 43, 101);
            font-family: sans-serif;
        }

        #demoPage {
            display: grid;
            grid-template-columns: 300px 1fr;
            max-width: 1000px;
            margin: 0 auto;
        }

        #widgetContainer {
            margin: 30px;
        }

        #widgetContainer > iframe {
            border: 1px solid #fff;
            border-radius: 8px;
            overflow: hidden;
            background: rgba(83,196,239,0.6);
            box-shadow: 1px 10px 47px 0 rgba(83,196,239,0.6);
        }

        #settingsContainer {
            text-align: right;
            color: #fff;
            margin-top: 30px;
        }

        #settingsForm > label {
            display: block;
            margin-bottom: 15px;
        }

        #settingsForm > label > span {
            display: block;
            margin-bottom: 2px;
        }

        #settingsForm input, #settingsForm select {
            border: 0;
            padding: 6px 0 4px 8px;
            border-right: 8px solid transparent;
            text-align: right;
            background: #ffffff36;
            color: #fff;
            border-radius: 4px;
            outline: none;
        }

        #settingsForm input:focus, #settingsForm select:focus {
            outline: 1px solid rgba(255,255,255,0.51);
        }

        #updateButton {
            background: rgb(202, 233, 255);
            color: rgb(5, 43, 101);
            border-radius: 8px;
            padding: 8px 20px;
            outline: none;
            border: 0;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
      </style>

      <div id="demoPage">
        <div id="settingsContainer">
            <h3>CowSwap widget</h3>
            <form id="settingsForm">
                <label>
                    <span>Network</span>
                    <select name="chainId">
                        <option value="1" selected="selected">Ethereum</option>
                        <option value="100">Gnosis chain</option>
                        <option value="5">Goerli</option>
                    </select>
                </label>
                <label>
                    <span>Environment</span>
                    <select name="env">
                        <option value="local" selected="selected">Local</option>
                        <option value="prod">Prod</option>
                    </select>
                </label>
                <label>
                    <span>Sell currency</span>
                    <input name="tradeAssets.sell.asset" type="text" value="COW"/>
                </label>
                <label>
                    <span>Sell amount</span>
                    <input name="tradeAssets.sell.amount" type="text" value="1200"/>
                </label>
                <label>
                    <span>Buy currency</span>
                    <input name="tradeAssets.buy.asset" type="text" value="WETH"/>
                </label>
                <label>
                    <span>Buy amount</span>
                    <input name="tradeAssets.buy.amount" type="text" value=""/>
                </label>
                <label>
                    <span>Theme</span>
                    <select name="theme">
                        <option value="light" selected="selected">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
                <button id="updateButton">Update</button>
            </form>
        </div>
        <div id="widgetContainer"></div>
      </div>
    </div>
  `
  const host = document.createElement('div')
  host.innerHTML = content

  return host
}
