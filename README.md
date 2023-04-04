# nodejs-typescript-template

NodeJS TypeScript Template

# Https Request Example

# Returns recent block production information

```
curl https://solana-devnet.g.alchemy.com/v2/rS9eq79KCsXcM_lDXbQsB9SrBXy3Js-4 -X POST -H "Content-Type: application/json" -d '{"id": 1, "jsonrpc": "2.0", "method": "getBlockProduction"}'
```

# WebSocket Request Example

# Listen to all finalized blocks

```
wscat -c wss://solana-devnet.g.alchemy.com/v2/rS9eq79KCsXcM_lDXbQsB9SrBXy3Js-4
```

# Then call a subscription

> {"jsonrpc": "2.0", "id": 1, "method": "signatureSubscribe", "params": ["2EBVM6cB8vAAD93Ktr6Vd8p67XPbQzCJX47MpReuiCXJAtcjaxpvWpcg9Ege1Nr5Tk3a2GFrByT7WPBjdsTycY9b"]}
