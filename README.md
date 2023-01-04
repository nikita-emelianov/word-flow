# Word Flow
Word Flow is a tool to learn new words on daily basis.

## Installation

```bash
$ npm install
```

# MVP Plan
1. Ability to add word with the meaning
2. Ability to retrieve word list
3. Ability to get random word with the meaning from the list

# Setup with Docker
1. Install docker
2. Pull latest mysql and phpmyadmin images
```bash
docker pull mysql:latest && docker pull phpmyadmin:latest
```
3. Run containers
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
5. Open http://localhost:8080

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

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
