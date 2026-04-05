# Stage 1: build the static frontend
FROM node:18-slim AS build

RUN apt-get -yqq update \
 && apt-get -yqq install python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/explorer/source

COPY package*.json npm-shrinkwrap.json* ./
COPY client/package*.json ./client/
COPY prerender-server/package*.json ./prerender-server/

RUN npm install

COPY . .

RUN DEST=/srv/explorer/static/meowcoin-mainnet npm run dist -- meowcoin-mainnet

# Stage 2: runtime image — nginx only, no node needed
FROM debian:bookworm-slim

RUN apt-get -yqq update \
 && apt-get -yqq upgrade \
 && apt-get -yqq install nginx curl \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

COPY --from=build /srv/explorer/static/meowcoin-mainnet /srv/explorer/static/meowcoin-mainnet

COPY contrib/meowcoin-mainnet-explorer.conf.in /srv/explorer/source/contrib/
COPY run.sh /srv/explorer/source/

RUN chmod +x /srv/explorer/source/run.sh \
 && ln -s /srv/explorer/source/run.sh /srv/explorer/run.sh

WORKDIR /srv/explorer
EXPOSE 80

# ELECTRS_HTTP_HOST and ELECTRS_HTTP_PORT must be set at runtime
# to point to a running electrs-mewc instance.
ENTRYPOINT ["/srv/explorer/run.sh"]
