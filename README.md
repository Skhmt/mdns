# mDNS in node

## Scripting

Run: `npm run start`

Build: `npm run build`

## Environment variables

`IP` - your IP address, defaults to 127.0.0.1 for testing
`HOST` - comma-separated list of hosts, defaults to `test.local`

## Docker Compose

```
  mdns:
    image: skhmt/mdns
    restart: unless-stopped
    environment:
      IP: 192.168.1.50
      HOST: foo.local, bar.local
```