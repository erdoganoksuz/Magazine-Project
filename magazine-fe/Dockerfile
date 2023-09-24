FROM node:20.1.0-slim AS build1
 RUN apt-get update \
     && apt-get upgrade -y \
     && apt-get install dumb-init \
     && apt-get install -y procps \
     && rm -rf /var/lib/apt/lists/*

# Create a directory for your app inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build your Next.js application
RUN npm run build

# Expose the port that your application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]