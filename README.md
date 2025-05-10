# 🚀 **NextJS with FastAPI Backend Starter**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Celery](https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white&style=for-the-badge)

## 🌟 **Overview**

This project is a full-stack web application built with:

- **[FastAPI](https://fastapi.tiangolo.com/)** for the backend.
- **[Next.js](https://nextjs.org/)** for the frontend.
- **[PostgreSQL](https://www.postgresql.org/)** for the database.
- **[Redis](https://redis.io/)** as a caching layer and task broker.
- **[Celery](https://docs.celeryq.dev/en/stable/getting-started/introduction.html)** for task management and background jobs.
- **[Docker](https://www.docker.com/)** for containerization and deployment.
- **[Ngnix](https://nginx.org/en/)** as Reverse Proxy Server.

## 🛠️ **Features**

- User authentication **(Built-in/Google)** with role-based access control.
- Frontend and Backend services are automatically proxied in a single port `8000` through **Nginx**.
- API endpoints for different user roles **(e.g., Admin, User, Doctor)**.
- Applying Caching using **Redis**.
- Asynchronous task processing with **Celery**.
- Fully containerized setup using **Docker**.
- All sensitive data is encrypted using **AES (Advanced Encryption Standard) in GCM (Galois/Counter Mode)** for robust data protection, ensuring confidentiality, integrity, and authenticity both in **backend** and **frontend**.
- Storing Hashed Passowords for security enhancement.
- General users receive short, unique URLs generated securely from `UIDs`. This ensures user-friendly links while maintaining data security.
- Realtime chatting system b/w doctor and patient
- Realtime chatting w admins for help
- Realtime health monitoring feature for EHR
- Organizing medications feature
- Realtime consultation system
- Modern UI
- rest will be updated

## 📂 **Directory Structure**

```plaintext
├── backend
│   ├── alembic
│   ├── app
│   │   ├── ai           # AI Wrapper (Needs Update)
│   │   ├── db           # Postgres Database
│   │   ├── routers      # API Endpoints
│   │   ├── workers      # Celery Tasks
│   │   ├── main.py      # FastAPI Application
│   ├── main.py          # Declared Main FasAPI Application
│   ├── .env             # Environment variables for the backend
│   ├── alembic.ini      # Generated Alembic file
│   └── Dockerfile       # Docker configuration for the backend
├── frontend
│   ├── app              # Next.js app router
│   ├── .env             # Environment variables for the frontend
│   └── Dockerfile       # Docker configuration for the frontend
├── nginx
│   └── nginx.conf       # Nginx configuration for backend and frontend
├── .env                 # Environment variables for the root
└── compose.yaml         # Multi-container orchestration
```

## ⚙️ Setup and Installation

### 1. Prerequisites

Ensure you have the following installed:

- [docker](https://docs.docker.com/get-docker/)
- [nodejs](https://nodejs.org/en) (Optional)
- [python](https://www.python.org/downloads/) (Optional)

### 2. Clone the repository

```bash
git clone https://github.com/firedev99/glucoguide.git glucoguide
cd glucoguide
```

### 3. Environment Variables

Create a `.env` file the root directory

```js
POSTGRES_USER=postgres
POSTGRES_PASS=
POSTGRES_DATABASE_NAME=gluco_guide
PGADMIN_DEFAULT_EMAIL=admin@glucoguide.com
PGADMIN_DEFAULT_PASS=
REDIS_PASSWORD=
FLOWER_BASIC_AUTH="username:password"
```

Navigate to backend folder and create another `.env` file in that directory.

```bash
cd backend
```

```js
FRONTEND_ORIGINS=http://localhost:3000, http://localhost:8000

ACCESS_TOKEN_EXPIRES=120
REFRESH_TOKEN_EXPIRES=5
HASHING_SECRET_KEY="base64 string w a 32bytes length [openssl rand -base64 32]"
JWT_SECRET_KEY=
JWT_ALGORITHM=HS256

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

OWNER_EMAIL=firethedev@gmail.com
SMTP_PASSWORD=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

POSTGRES_USER=postgres
POSTGRES_PASS=
POSTGRES_HOST=postgres
POSTGRES_PORT=5433
POSTGRES_DATABASE_NAME=gluco_guide
PGADMIN_DEFAULT_EMAIL=admin@glucoguide.com
PGADMIN_DEFAULT_PASS=

REDIS_PASSWORD=
REDIS_HOST=redis
REDIS_PORT=6379

FLOWER_BASIC_AUTH="username:password"
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

DEEPSEEK_API_KEY=
```

Navigate to frontend folder and create another `.env` file in that directory.

```bash
cd frontend
```

```bash

NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_ENCRYPTION_SECRET_KEY="base64 string w a 32bytes length [openssl rand -base64 32]"
NEXT_PUBLIC_API=http://localhost:8000/api/v1
NEXT_PUBLIC_URL=http://localhost:8000
# this is needed for nextjs middleware, cause the actual frontend is getting redirected from port 3000 to 8000 through nginx
NEXT_PUBLIC_OG_URL=http://localhost:3000
```

### 4. Create a `virtualenv` in the backend folder (Optional)

```py
python3 -m venv venv
```

- on mac activate using command `source venv/bin/acitvate`
- on windows activate using command `venv/Scripts/acitvate`

### 5. Start the application

Run the application from the root folder using `docker-compose` command:

```bash
cd glucoguide
docker-compose up
```

If the operating system is `windows` use `--watch` flag to enable watch mode

```bash
docker compose up --watch
```

- After loading all the resources and databases you can visit [http://localhost:8000](http://localhost:8000) where `Frontend` and `Backend` services are automatically proxied through `Nginx`.

### 6. Run the Applications Locally (Optional / Will take other additional steps)

### Frontend:

```bash
cd frontend
yarn dev
```

### Backend:

make sure the backend virtual env is activated [check this instruction](#4-create-a-virtualenv-in-the-backend-folder-optional).

```bash
cd backend
python main.py
```

### 7. Connect the PostgreSQL Database

### Dpage/PgAdmin4:

Go to [http:/localhost:8080](http:/localhost:8080) and add the following stuffs:

- host: `postgres`
- port: `5433`
- user: `postgres`
- db: `gluco_guide`

### Localhost Machine

If you intend to use the database with your locally installed applications like `dbeaver` or `pgAdmin (desktop)` just change the host to `localhost`

- host: `localhost`
- port: `5433`
- user: `postgres`
- db: `gluco_guide`

### Migrations

Run the `backend cli` container from `docker desktop` application or use the following command from terminal.

```bash
docker exec -it <container name> /bin/bash
```

Then run the following `migration` command:

```bash
alembic upgrade head
```

### Seeding

Intially the database is empty, therefore after a successful migration we need to seed data into the database itself. Run the `backend cli` container from `docker desktop` application or use the following command from terminal.

```bash
docker exec -it <container name> /bin/bash
```

Then run the following `seeding` command:

```bash
python seed.py
```

### Windows Users: Adjustment (for development mode) 🔧

Docker handles volumes differently in windows and if your platform is **windows**, inorder to view the changes in development mode you have to adjust a few steps in the **frontend** and **backend** containers from [**compose.yaml**](compose.yaml) file.

```bash
# other containers
frontend:
  # ...other specifications
  # remove volume
  # volumes:
  #   - "./frontend:/app"
  # add this lines (enable watch mode)
  develop:
    watch:
      - action: sync
        path: "./frontend"
        target: "/app"
      - action: rebuild
        path: "./frontend/package.json"
      - action: rebuild
        path: "./frontend/next.config.mjs"
backend:
  # ...other specifications
  # remove volume
  # volumes:
  #   - "./backend:/app"
  # add this lines (enable watch mode)
  develop:
    watch:
      - action: sync
        path: "./backend"
        target: "/code"
      - action: rebuild
        path: "./backend/requirements.txt"
```

<br>

## 👻 **API Endpoints**

| Endpoints                                              |  Method   | Description                                                              |                      Params                      | Auth |          Role          |
| :----------------------------------------------------- | :-------: | :----------------------------------------------------------------------- | :----------------------------------------------: | :--: | :--------------------: |
| api/v1/auth/login                                      |   POST    | Login with credentials                                                   |                       None                       | N/A  |        General         |
| api/v1/auth/signup                                     |   POST    | Signup with credentials                                                  |                       None                       | N/A  |        General         |
| api/v1/auth/logout                                     |   POST    | Log out functionality                                                    |                       None                       | N/A  |        General         |
| api/v1/auth/google                                     |    GET    | Google redirect URL                                                      |                      Custom                      | N/A  |        General         |
| api/v1/auth/google/callback                            |    GET    | Google callback URL                                                      |                      Custom                      | N/A  |        General         |
| api/v1/send-email                                      |    GET    | Send mail using Celery (Automation)                                      |                       None                       | N/A  |        General         |
| api/v1/tasks/{task_id}                                 |    GET    | Retrive the Celery task details                                          |                        id                        | N/A  |        General         |
| `🍌 DIET`                                              |           |                                                                          |                                                  |      |                        |
| api/v1/diet/meal                                       |    GET    | Retrieve all the meals available                                         |             q, page, limit, category             | Yes  |    Patient, Doctor     |
| `🏥 HOSPITALS`                                         |           |                                                                          |                                                  |      |                        |
| api/v1/hospitals/info                                  |    GET    | Retrieve all the hospitals                                               |            q, page, limit, locations             | N/A  |        General         |
| api/v1/hospitals/{id}/info                             |    GET    | Retrieve a specific hospital                                             |                        id                        | N/A  |        General         |
| api/v1/hospitals/tags/cities                           |    GET    | Retrieve all hospital locations                                          |                       N/A                        | N/A  |        General         |
| api/v1/hospitals/tags/names                            |    GET    | Retrieve all hospital name                                               |                       N/A                        | N/A  |        General         |
| `🧜🏻‍♂️ DOCTORS`                                           |           |                                                                          |                                                  |      |                        |
| api/v1/doctor/info                                     |    GET    | Retrieve all the doctors                                                 | q, page, limit, hospitals, locations, experience | N/A  |        General         |
| api/v1/doctors/{id}/info                               |    GET    | Retrieve specific doctor informations                                    |                        id                        | N/A  |        General         |
| api/v1/doctors/hospital                                |    GET    | Retrieve all doctors of a specific hospital                              |                 id, page, limit                  | N/A  |        General         |
| `🥶 PATIENT'S PROFILE`                                 |           |                                                                          |                                                  |      |                        |
| api/v1/patient/profile                                 |    GET    | Retrieve specific patient profile                                        |                       N/A                        | Yes  |        Patient         |
| api/v1/patient/profile                                 |    PUT    | Update specific patient profile                                          |                     payload                      | Yes  |        Patient         |
| api/v1/patient/profile/password                        |    PUT    | Update specific patient profile password                                 |                     payload                      | Yes  |        Patient         |
| `❤️‍🩹 PATIENT'S APPOINTMENTS`                            |           |                                                                          |                                                  |      |                        |
| api/v1/patient/appointments/info                       |    GET    | Retrieve specific patient's appointments                                 |                  q, page, limit                  | Yes  |        Patient         |
| api/v1/patient/appointments/new                        |    GET    | Create a new appointment for the logged-in patient                       |                     payload                      | Yes  |        Patient         |
| api/v1/patient/appointments/{id}/info                  |    GET    | Retrieve specific appointment information                                |                        id                        | Yes  |        Patient         |
| api/v1/patient/appointments/{id}/info                  |    PUT    | Update specific appointment information by id                            |                   id, payload                    | Yes  |        Patient         |
| api/v1/patient/appointments/upcoming                   |    GET    | Retrieve all the upcoming appointments of the patient                    |                       N/A                        | Yes  |        Patient         |
| `❤️‍🩹 PATIENT'S HEALTH RECORDS`                          |           |                                                                          |                                                  |      |                        |
| api/v1/patient/health/records                          |    GET    | Retrieve logged-in patient's health records                              |                       N/A                        | Yes  |        Patient         |
| api/v1/patient/health/records                          |    PUT    | Update specific patient's health records                                 |                        id                        | Yes  |        Patient         |
| api/v1/patient/health/records/new                      |   POST    | Create new health record for the logged-in patient                       |                     payload                      | Yes  |        Patient         |
| ws://{port}/api/v1/ws/monitoring/{user_id}             | Websocket | Socket connection to retrieve electronic health record (EHR) in realtime |                       N/A                        | N/A  |    Patient, Doctor     |
| `🧘🏼 Patient's Medications`                             |           |                                                                          |                                                  |      |                        |
| api/v1/patient/medication/suggestions                  |    GET    | Retrieve patient's medication history                                    |                       N/A                        | Yes  |        Patient         |
| api/v1/patient/medication/suggestions                  |    PUT    | Update patient's medication history                                      |                   id, payload                    | Yes  |        Patient         |
| api/v1/patient/medication/generate                     |   POST    | Manually generate Suggestion for patient                                 |                     payload                      | Yes  |        Patient         |
| api/v1/patient/medication/appointment                  |    GET    | Retrieve medication history of a appointment by id                       |                        id                        | Yes  |        Patient         |
| api/v1/patient/medication/appointment                  |  DELETE   | Delete medication history of a appointment by id                         |                        id                        | Yes  |        Patient         |
| `👨🏼‍💻 Chat System`                                       |           |                                                                          |                                                  |      |                        |
| api/v1/chats/user/{user_id}                            |    GET    | Retrieve User Help Chats                                                 |                 id, page, limit                  | Yes  |        Patient         |
| api/v1/chats/{user_id}/{receiver_id}                   |    GET    | Communication b/w doctor and patient                                     |       sender_id, receiver_id, page, limit        | Yes  |    Patient, Doctor     |
| ws://{port}/api/v1/ws/admin/help                       | Websocket | Socket connection to chat in realtime                                    |                       N/A                        | Yes  |        Patient         |
| ws://{port}/api/v1/ws/chats/${user_id}                 | Websocket | Socket connection between two ports in realtime                          |                       N/A                        | Yes  | Patient, Doctor, Admin |
| `🦹🏼 Doctors's Portal (Partially Complete)`             |           |                                                                          |                                                  |      |                        |
| api/v1/users/doctor/info                               |    GET    | Retrieve doctors's information                                           |                       N/A                        | Yes  |         Doctor         |
| api/v1/users/doctor/{doctor_id}/patients               |    GET    | Retrieve all the patients of the doctor                                  |      doctor_id, q, age, gender, page, limit      | Yes  |         Doctor         |
| api/v1/users/doctor/{doctor_id}/analytics              |    GET    | Retrieve analytics of the doctor                                         |                 doctor_id, type                  | Yes  |         Doctor         |
| api/v1/users/doctor/appointments                       |    GET    | Retrieve all the consultations/appointments doctor                       |     doctor_id, date, status, q, page, limit      | Yes  |         Doctor         |
| api/v1/users/doctor/appointments/info/{id}             |    GET    | Retrieve a specific consultation/appointment information                 |                  appointment_id                  | Yes  |         Doctor         |
| api/v1/users/doctor/appointments/info/{id}             |    PUT    | Update a specific consultation/appointment information                   |             appointment_id, payload              | Yes  |         Doctor         |
| api/v1/users/doctor/appointments/requested             |    GET    | Get the appointment/consultation requests id                             |                       N/A                        | Yes  |         Doctor         |
| api/v1/users/doctor/appointments/today                 |    GET    | Get the appointment/consultation that is on today                        |                    doctor_id                     | Yes  |         Doctor         |
| api/v1/users/doctor/appointments/patient/{patient_id}  |    GET    | Retrieve previous appointment history of a patient                       |                    patient_id                    | Yes  |         Doctor         |
| ws://{port}/api/v1/ws/appointment/requests/{doctor_id} | Websocket | Get realtime requests for of consultations from patients                 |                    doctor_id                     | N/A  |         Doctor         |

<br>

# 🤝 Contributing

### 1. Create a Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

### 2. Commit Your Changes

Commit your changes with descriptive message:

```bash
git add .
git commit -m "description of your feature"
git push origin feature/your-feature-name
```

### 3. Open a Pull Request

- Navigate to the original repository on GitHub.
- Click the `Pull Requests` tab.
- Click `New Pull Request` and select your branch.
- Provide a clear `title` and description of your changes, and submit the pull request.

# 👨🏻‍🍳 Merging and Syncing Updates

To add upstream remote to the forked repository, run the following command

```bash
git remote add upstream https://github.com/firedev99/nextjs-fastapi-docker.git
```

To synchronized with the original repository, run the following command

```bash
git fetch upstream
git merge upstream/master
```

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

```bash
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
