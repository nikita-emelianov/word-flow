# Word Flow
Word Flow is a tool to learn new words on daily basis.

**MVP Tech:**
1. Telegram bot

**MVP Features:**
1. Add word with the meaning
2. Get word list

## Fast start
```bash
# build and run all services
# add --build for rebuild 
docker compose up -d

# or to run specific service 
docker compose up -d [SERVICE...]
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

## Deployment
- Install docker on the server.
- Use script from scripts/deploy.sh to run deployment.
- open ports to the internet: 
  - 80 port for backend access.
  - 8080 port for phpmyadmin access.
  - 3306 port for direct mysql engine access if you want to manage mysql from external.

## Support & License
Word Flow is an [MIT licensed](LICENSE) open source project.
