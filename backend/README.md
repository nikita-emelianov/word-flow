# Word Flow backend

## HOWTO start with Docker
Use [Word Flow manual](../README.md) for a fast start

## Local development without docker
1. Install packages
```bash
npm install
```
2. Set up .env variables in '.env'. See [.env.defaults](.env.defaults)
3. To run mysql and phpmyadmin in Docker see [Word Flow manual](../README.md)
4. Run with
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
5. Open http://localhost:3000

## Test
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
