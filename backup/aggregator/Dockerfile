FROM oven/bun:latest
WORKDIR /app

COPY ./package.json /app
RUN bun install

COPY . /app
ENTRYPOINT [ "bun", "run", "dev" ]