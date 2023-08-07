# Word Flow
Word Flow is a tool to learn new words on daily basis.

#### TODOs
tech:

* make backend private by adding auth flow
* mount volume local to docker container -> it makes it easy to build and test changes on the fly 

docs:

* improve CI/CD section markup

features:

* learning flow :
  * two main learning curves - in order to learn the word you need to get it correct from the meaning to the name 5 
    times and 5 times from the name to the meaning. Max times that word is shown in one day - 5 times. 
  * all constants are hardcoded for now in the DB special table
  * 'start to learn' button
  * show user random word or meaning and ask to write the meaning or the word itself
  * after input show user the correct answer behind the word and show two buttons - correct and wrong
  * if correct - put +1 to the learning flow to this word
  * if wrong - put -1 to the learning flow to this word
* .csv export from cambridge dictionary

## Fast start
1. Set up your bot with @BotFather on Telegram
2. Install Docker
3. Create .env file with environment variables from [.env.defaults](.env.defaults)
4. Run with
```bash
# pull and run all services
docker compose up -d --no-build

# to build locally and run all services
docker compose up -d --build

# or to run specific service 
docker compose up -d [SERVICE...]
```

to change any of env variables you need to stop and remove existing containers first
```bash
docker compose down
```

## Without docker compose
### Docker mysql and phpmyadmin
1. Install docker
2. Pull latest mysql and phpmyadmin images
```bash
docker pull mysql:latest && docker pull phpmyadmin:latest
```
3. Run mysql and phpmyadmin containers
```bash
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=rootpass -e MYSQL_DATABASE=word_flow -d mysql:latest
docker run --name phpmyadmin -d --link mysql:db -p 8080:80 phpmyadmin:latest
```
4. Check
```bash
# check containers are running
docker ps

# check mysql
docker exec -it mysql bash
mysql --user=root --password=rootpass
```
### Backend
1. Set up .env variables in '.env' (see [.env.defaults](backend/.env.defaults))
2. Build image
```bash
# docker run
docker build -t word-flow ./backend
```
3. Run container
```bash
docker run -p 80:3000 -d word-flow
```
4. Open http://localhost

### Bot
1. Set up .env variables in '.env' (see [.env.defaults](bot/.env.defaults))
2. Build image
```bash
# docker run
docker build -t bot ./bot
```
3. Run container
```bash
docker run -d bot
```
4. Open telegram bot

## CI/CD
This section is admin-only or if you want to configure your own CI/CD
This example is checked on Amazon Lightsail Debian 11.4.
- Create Docker Hub repo.
- GitHub. Setup all encrypted secrets required for the Actions workflow from in your repo [main.yml](.github/workflows/main.yml).
  See what is encrypted secrets [here](https://docs.github.com/en/actions/security-guides/encrypted-secrets).
  See how to define GitHub Actions workflow with Docker Hub [here](https://docs.docker.com/build/ci/github-actions/)
- Install docker to the server using [this](https://docs.docker.com/engine/install/debian/#install-using-the-repository).
- Install [webhook tool](https://github.com/adnanh/webhook) to the server.
- Copy deploy [script](deploy/deploy.sh) and [hooks config](deploy/hooks.yml) to your server. tip: use wget -O filename https://url-to-raw-file
  Don't forget to adjust permissions for the files to be able to run the script and the webhook (chmod 777 filename)
- add your secret for webhook as environment global variable that you used on github in the following file:
  /etc/environment – This file is used to set up system-wide environment variables
  Set 'DEPLOY_WEBHOOK_SECRET=yourwebhooksecret'. For the changes to take effect, use the command 'source /etc/environment'
- Copy .env file with environment variables from [.env.defaults](.env.defaults)
  Adjust variables according to your needs.
- Open ports to the internet: 
  - 80 port for public backend access.
  - 9000 port for public webhooks access.
  - 8080 port for phpmyadmin access (should be restricted to your IP address);
  - 3306 port for direct mysql engine access if you want to manage mysql from external.
- run 'sh deploy.sh' for the first time to start the webhook service and docker-compose file. 
  Next time it will be run automatically on push to main.

## Support & License
Word Flow is an [MIT licensed](LICENSE) open source project.
