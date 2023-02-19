# Word Flow
Word Flow is a tool to learn new words on daily basis.

#### TODOs
tech:

* auto redeploy webhook (+auth)
* make backend private by adding auth flow
* mount volume local to docker container so it would be easy to build and test changes on the fly 

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
1. Build image
```bash
# docker run
docker build -t word-flow ./backend
```
2. Run container
```bash
docker run -p 80:3000 word-flow
```
3. Open http://localhost

## CI/CD
This section is admin-only or if you want to configure your own CI/CD
- Setup secrets for the worflow on [main.yml](.github/workflows/main.yml). See [link](https://docs.github.com/en/actions/security-guides/encrypted-secrets) for more info.
- Install docker on the server.
- Use script from scripts/deploy.sh to run deployment.
- open ports to the internet: 
  - 80 port for backend access.
  - 8080 port for phpmyadmin access.
  - 3306 port for direct mysql engine access if you want to manage mysql from external.

## Support & License
Word Flow is an [MIT licensed](LICENSE) open source project.
