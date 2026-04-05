# Meowcoin Block Explorer

[![MIT license](https://img.shields.io/github/license/blockstream/esplora.svg)](LICENSE)

Open source block explorer for the [Meowcoin](https://mewccrypto.com) network, forked from [Blockstream/esplora](https://github.com/Blockstream/esplora).

Built as a single-page app in a reactive/functional style using [RxJS](https://github.com/ReactiveX/rxjs) and [Cycle.js](https://cycle.js.org/).
Requires [electrs-mewc](https://github.com/Meowcoin-Foundation/electrs-mewc) as the backend API.

## Features

- Explore blocks, transactions and addresses
- Shows previous output and spending transaction details
- Quick-search for txid, address, block hash or height via `/<query>`
- Advanced view with script hex/assembly, witness data, outpoints and more
- Mobile-ready responsive design
- Light and dark themes
- Noscript support (pre-rendered HTML)

## Prerequisites

- A running **Meowcoin Core** node (mainnet)
- A running **[electrs-mewc](https://github.com/Meowcoin-Foundation/electrs-mewc)** instance with the HTTP API enabled

electrs-mewc exposes its REST API on port `3000` by default.

## Developing

```bash
git clone https://github.com/Meowcoin-Foundation/esplora-mewc && cd esplora-mewc
npm install
export API_URL=http://localhost:3000/
npm run dev-server
# open http://localhost:5000
```

## Building static assets

```bash
npm run dist -- meowcoin-mainnet
# output goes to dist/
```

The build reads `flavors/meowcoin-mainnet/config.env` for site metadata.
Serve the resulting `dist/` directory with nginx (or any static server) and proxy `/api/` to your electrs-mewc instance.

## Docker

### Build image locally

```bash
docker build -f contrib/Dockerfile -t esplora-mewc .
```

### Run

```bash
docker run -p 8080:80 \
  -e ELECTRS_HTTP_HOST=host.docker.internal \
  -e ELECTRS_HTTP_PORT=3000 \
  esplora-mewc
```

| Environment variable | Default | Description |
|---|---|---|
| `ELECTRS_HTTP_HOST` | `127.0.0.1` | Hostname/IP of the electrs-mewc HTTP API |
| `ELECTRS_HTTP_PORT` | `3000` | Port of the electrs-mewc HTTP API |

### Docker Hub

Pre-built images are published to Docker Hub on every push to `master`:

```bash
docker pull zachprice105/esplora-mewc:latest
```

## Configuration

Environment variables for `npm run dist`:

| Variable | Description |
|---|---|
| `API_URL` | URL of the electrs-mewc HTTP API (default: `BASE_HREF + "api"`) |
| `BASE_HREF` | Base path for the app (default: `/`) |
| `CANONICAL_URL` | Canonical URL of the explorer (enables OpenSearch) |
| `SITE_TITLE` | Browser tab title |
| `SITE_DESC` | Meta description |
| `SITE_FOOTER` | Footer text |
| `NATIVE_ASSET_LABEL` | Ticker symbol (default: `MEWC`) |
| `NATIVE_ASSET_NAME` | Coin name (default: `Meowcoin`) |

## License

MIT — see [LICENSE](LICENSE).

Originally developed by [Nadav Ivgi](https://github.com/shesek) and [Blockstream](https://blockstream.com).
