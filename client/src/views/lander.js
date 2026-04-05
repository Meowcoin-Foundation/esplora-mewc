import Snabbdom from 'snabbdom-pragma'
import layout from './layout'

const staticRoot = process.env.STATIC_ROOT || ''

const LandingPage = ({ t, theme, ...S }) =>
  layout(
    <div className="landing-page">
      <div className="hero-section">
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-text">
              <h1 className="font-h1">Meowcoin Block Explorer</h1>
              <p className="font-p1 text-gray">
                Explore blocks, transactions, and addresses on the Meowcoin network.
              </p>
              <a href="." className="g-btn primary-btn">Go to Explorer</a>
            </div>
            <div className="hero-image">
              <img src={`${staticRoot}img/icons/menu-logo.svg`} alt="Meowcoin" style="max-width:200px;opacity:0.85" />
            </div>
          </div>
        </div>
      </div>
    </div>
  , { t, activeTab: 'explorer', ...S })

export default LandingPage
