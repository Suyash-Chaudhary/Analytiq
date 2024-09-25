FROM node:alpine
WORKDIR /app

COPY ./package.json /app
RUN npm install

COPY . /app
ENTRYPOINT [ "npm", "run", "dev" ]