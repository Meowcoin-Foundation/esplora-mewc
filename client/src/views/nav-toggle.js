import Snabbdom from 'snabbdom-pragma'
import { updateQuery } from '../util'

const hasCam = process.browser && navigator.mediaDevices && navigator.mediaDevices.getUserMedia
const otherTheme = { dark: 'light', light: 'dark' }

export default (t, theme, page) =>

<div className="toggle-container">
    <div className="burger-icon">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div className="toggle-menu">
      <div className="toggle-menu-header">
        { process.browser ? <div className="switch-theme-icon toggle-theme"></div>
                        : <a href={page.pathname.substr(1) + updateQuery(page.query, { theme: otherTheme[theme] })} className="switch-theme-icon"></a>
        }
      </div>
      <div className="section2">
        <div className="link-list">
          <h4 className="menu-title font-h5">Explorer</h4>
          <ul className="font-p3">
            <li><a href="/" rel="external">Meowcoin Mainnet</a></li>
          </ul>
          <h4 className="menu-title font-h5">Developer Tools</h4>
          <ul className="font-p3">
            <li><a href="https://github.com/Meowcoin-Foundation/esplora-mewc/blob/master/API.md" target="_blank">API Docs</a></li>
            <li><a href="tx/push">Broadcast Transaction</a></li>
            { hasCam ? <li><a href="scan-qr">Scan QR</a></li> : "" }
          </ul>
        </div>
        <div className="link-list">
          <h4 className="menu-title font-h5">Meowcoin</h4>
          <ul className="font-p3">
            <li><a href="https://github.com/Meowcoin-Foundation/electrs-mewc" target="_blank">electrs-mewc</a></li>
            <li><a href="https://github.com/Meowcoin-Foundation/esplora-mewc" target="_blank">esplora-mewc</a></li>
          </ul>
        </div>
      </div>
    </div>
</div>
