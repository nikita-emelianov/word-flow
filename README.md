# Word Flow
Word Flow is a tool to learn new words on daily basis.

# MVP Plan
Tech:
1. docker-compose.yml to run everything with a single setup
2. deploy & run on lightsail
3. telegram bot

Features:
1. Add word with the meaning
2. Get word list

# Setup & run mysql and phpmyadmin with Docker
1. Install docker
2. Pull latest mysql and phpmyadmin images
```bash
docker pull mysql:latest && docker pull phpmyadmin:latest
```
3. Run mysql and phpmyadmin containers
```bash
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=rootpass -e MYSQL_DATABASE=word_flow -d mysql:latest
docker run --name phpmyadmin -d --link mysql:db -p 8081:80 phpmyadmin:latest
```
4. Check
```bash
# check containers are running
docker ps

# check mysql
docker exec -it my-own-mysql bash
mysql --user=root --password=rootpass
```

# Setup & run

## Docker
1. Build image
```bash
# docker run
docker build -t word-flow .
```
2. Run container
```bash
docker run -p 80:3000 word-flow
```
3. Open http://localhost

## Locally
1. Install packages
```bash
$ npm install
```
2. Change `host` in `app.module.ts` to `localhost`
3. Run with

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
4. Open http://localhost:3000

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support & License

Word Flow is an [MIT licensed](LICENSE) open source project.
