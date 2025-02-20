# Build Stage
FROM node:latest AS build-stage

WORKDIR /app

# Copy the rest of the application files to the working directory

COPY . .

# Install dependencies
RUN corepack enable yarn

RUN npm i

RUN yarn install

RUN yarn workspace app build

WORKDIR /app/app

EXPOSE 5173
CMD ["vite", "serve", "--host"]
