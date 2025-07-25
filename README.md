# Student Management App

A full-stack web application to manage student data.

## Features

- Login & Signup
- Store student info (name, DOB, NRC, father name, email, phone, addresses, photo)
- Dashboard, Admin Panel, Profile Page
- Photo upload
- Built with React + Bootstrap (frontend), Flask + MongoDB (backend)
- Fully containerized (Docker, docker-compose)

## How to Run

### Prerequisites

- Docker and Docker Compose installed

### Build and Run

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

MongoDB data is persisted in the `mongo_data` Docker volume.

### Development

- For backend code changes, restart the backend container.
- For frontend code changes, rebuild the frontend container or develop locally.
