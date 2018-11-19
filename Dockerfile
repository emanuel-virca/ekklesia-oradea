# STEP 1 base image
FROM node:10-alpine as builder

# set working directory
WORKDIR /usr/src/app

# install dependencies
COPY package.json package.json
RUN npm install --silent

# install app
COPY . /usr/src/app

# build app
RUN npm run build


# STEP 2 build a small nginx image with static website
FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' copy website to default nginx public folder
COPY --from=builder /usr/src/app/dist/ekklesia-oradea /usr/share/nginx/html

# start app
CMD ["nginx", "-g", "daemon off;"]
