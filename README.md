![alt text](/docs//wallpaper.png "Title")

# Magazine Apps Docker Compose Setup

This repository contains a Docker Compose setup for running two applications: a Nest.js backend (magazine-service) and a Next.js frontend (magazine-fe), along with a MySQL database.

## Prerequisites

Before you get started, ensure that you have the following prerequisites installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/erdoganoksuz/magazine-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd magazine-project
   ```

3. Build and run the Docker containers using Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Your Magazine applications will now be accessible:
   - Nest.js Magazine Service: http://localhost:4000
   - Next.js Magazine Frontend: http://localhost:3000
   - MySQL Database: localhost:3306 (Use appropriate MySQL client to connect)

## API Documentation (Swagger)

You can access the Swagger API documentation by visiting the following URL:

- Swagger API Documentation: http://localhost:4000/api

## Configuration

The `.env `file in the magazine-service folder contains configuration options for the Nest.js application. Update this file to configure database connections, API keys, and other environment-specific settings for your Magazine Service.

## Stopping the Containers

To stop and remove the Docker containers, press Ctrl + C in the terminal where Docker Compose is running, and then run the following command:

```bash
docker-compose down
```

## Docker Compose Video

![](/docs/docker-compose.mov)

## Full Demo Video

![](/docs/demo.mov)