#!/bin/bash
set -eo pipefail

# Address of the electrs-mewc HTTP API
ELECTRS_HTTP_HOST=${ELECTRS_HTTP_HOST:-127.0.0.1}
ELECTRS_HTTP_PORT=${ELECTRS_HTTP_PORT:-3000}

STATIC_DIR=/srv/explorer/static/meowcoin-mainnet
CONF_IN=/srv/explorer/source/contrib/meowcoin-mainnet-explorer.conf.in

if [ ! -d "$STATIC_DIR" ]; then
    echo "Error: static directory $STATIC_DIR not found."
    exit 1
fi

# Generate nginx config from template
sed \
    -e "s|{STATIC_DIR}|$STATIC_DIR|g" \
    -e "s|{ELECTRS_HTTP_HOST}|$ELECTRS_HTTP_HOST|g" \
    -e "s|{ELECTRS_HTTP_PORT}|$ELECTRS_HTTP_PORT|g" \
    "$CONF_IN" > /etc/nginx/sites-enabled/default

# Run as root inside container
sed -i 's/user www-data;/user root;/' /etc/nginx/nginx.conf

echo "Starting Meowcoin Explorer nginx on :80"
echo "  Proxying /api/ -> http://${ELECTRS_HTTP_HOST}:${ELECTRS_HTTP_PORT}/"
echo "  Serving static files from ${STATIC_DIR}"

exec nginx -g "daemon off;"
