Gluco Guide is an Integrated Heath Monitoring System for Diabetes Patients.

## Getting Started using Docker

- First [Install Docker](https://docs.docker.com/get-docker/) on your machine.

Build the project container with the following command:

```bash
docker-compose up --build
```

Run the container with the following command:

```bash
docker-compose up
# or
docker compose up --watch
```

Development: To view live changes in the code either run `docker compose up --watch` or press `w` after running the command `docker-compose up` from the terminal.

## Getting Started Locally

To start the project locallay make sure to have the following requirements installed in your machine.

- [Python](https://www.python.org/downloads/)
- [NodeJS](https://nodejs.org/en/download/source-code)
- `optional` [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

Then open your terminal and install the project packages using the following command:

```bash
yarn
# or
npm install
```

Run the project locally in development mode using the following command:

```bash
yarn fire
# or
npm run fire
```

## Collaborate to this project

- For collaboration you need to fork and `clone` or `dowload` the repository.

### How to Fork the repository

- Go to this page [GlucoGuide](https://fastapi.tiangolo.com/tutorial), there is a button named `Fork` in the top right corner of the page.

### How to Clone the repository

- Create a directory, for example `gluco-guide-diabetes-patients`.
- Enter in the newly created directory:

```bash
cd gluco-guide-diabetes-patients
```

- Clone the the repository manually into `gluco-guide-diabetes-patients` directory:

```bash
git clone https://github.com/firedev99/gluco-guide-diabetes-patients.git
```

### How to push codes into the repository

```bash
git add .
git commit -m "commit message"
git push -u origin master
```

### How to Merge or Sync update codes from the main repository (original repository):

To add upstream remote to the forked repository, run the following command

```bash
<<<<<<< HEAD
git remote add upstream https://github.com/firedev99/gluco-guide-diabetes-patients.git
=======
git remote add upstream https://github.com/firedev99/nextjs-fastapi-docker.git
>>>>>>> ae56bef (base backend, data encryption, role based routings w custom middleware, updated readme)
```

To synchronized with the original repository, run the following command

```bash
git fetch upstream
git merge upstream/master
```

<<<<<<< HEAD

## Learn More

To learn more about HTML, CSS, JavaScript, and TailwindCSS take a look at the following resources:

- [HTML](https://www.w3schools.com/html)
- [CSS](https://www.w3schools.com/css)
- [JavaScript](https://www.w3schools.com/js)
- [TailwindCSS](https://tailwindcss.com/docs)

To learn more about ReactJS, take a look at the following resources:

- [ReactJS Reference](https://react.dev/reference/react) - learn about ReactJS features.
- [Learn ReactJS](https://react.dev/learn) - an interactive ReactJS tutorial.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about FastAPI, take a look at the following resources:

- # [Learn FastAPI](https://fastapi.tiangolo.com/tutorial) - learn about FastAPI features.

# 👨‍🎨 Some Useful Commands to Help with inpecting this project

### 🔌 Github

Commit Changes

```bash
git add .
git commit -m "commit description"
git push -u origin master
```

View Existing Remote URL

```bash
git remote -v
```

Change the "origin" Remote's URL

```bash
git remote set-url origin https://github.com/user/repo2.git
```

### 📦 Docker Compose

If you want to run your services in the background, you can pass the `-d` flag (for "detached" mode) to `docker compose up` and use `docker compose ps`

Initialize or Run containers in detached mode w/o building new images:

```bash
docker-compose up -d
```

Rebuild containers and run the docker instance:

```bash
docker-compose --build
```

If you started Compose with docker compose up -d, stop your services once you've finished with them

```bash
docker-compose stop
```

You can bring everything down, removing the containers entirely, with the command:

```bash
docker-compose down
```

List the local volumes, images, containers:

```bash
docker volume ls
docker image ls
docker container ls
```

Remove all dangling images. If -a is specified, also remove all images not referenced by any container, remove all the containers, remove volume.

```bash
docker image prune -a
docker container prune
docker volume prune
docker volume rm <volume name>
```

### 🛠️ IP Address Listing

```
# for mac users

cat /etc/hosts
sudo lsof -iTCP -sTCP:LISTEN -P -n
sudo lsof -i TCP:PORTNUMBER (PORTNUMBER e.g, 3000)
# or
sudo lsof -i :PORTNUMBER (PORTNUMBER e.g, 3000)
```

The `/etc/hosts` file is a plain text file that maps hostnames to IP addresses for the local host and other hosts on the internet.

```bash
# for windows users

netstat -a -n -o
```

### 🫙 PostgreSQL Cluster

Check if the port is accepting connection or not from `PostgreSQL` Cluster with the following command:

```bash
pg_isready -h localhost -p 5433
```

# 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) for details.

# ⚓️ Ports

- Main Application / Nginx: [http://localhost:8000](http://localhost:8000)
- Backend Server: [http://localhost:8001](http://localhost:8001)
- Frontend Client: [http://localhost:3000](http://localhost:3000)
- PgAdmin (DB Software): [http://localhost:8080](http://localhost:8080)
- Redis Insight (DB Software): [http://localhost:5540](http://localhost:5540)
- Flower Task/Worker Monitor: [http://localhost:5555](http://localhost:5555)
- PostgreSQL Hosting Port: `5433`
- Redist Hosting Port: `6379`

# 💬 Contact

If you have any questions, feel free to reach out:

- **Github** - [@firedev99](https://github.com/firedev99)
- **Twitter** - [@firethedev99](https://twitter.com/thedevguy99)
- **Email** - firethedev@gmail.com
  > > > > > > > ae56bef (base backend, data encryption, role based routings w custom middleware, updated readme)
