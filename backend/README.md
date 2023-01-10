# Word Flow backend

## HOWTO start
Use [Word Flow manual](../README.md) for a fast start

## Local development
1. Install packages
```bash
npm install
```
2. Change `host` in [app.module.ts](src/app.module.ts) to `localhost`
3. Run with
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
4. Open http://localhost:3000

## Test
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
