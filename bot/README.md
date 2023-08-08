# Word Flow bot

## HOWTO start with Docker
Use [Word Flow manual](../README.md) for a fast start

## Local development without docker
1. Install packages
```bash
npm install
```
2. Set up .env variables in '.env'. See [.env.defaults](.env.defaults)
3. To run mysql and phpmyadmin in Docker see [Word Flow manual](../README.md)
4. To run backend see [Backend manual](../backend/README.md)
5. Run with
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
6. Use bot
