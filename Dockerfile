# Build Stage
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copy the rest of the application files to the working directory

COPY . .

# Install dependencies
RUN corepack enable yarn

RUN yarn install

RUN yarn workspace app build

EXPOSE 5173
CMD ["yarn","workspace","app","start"]
