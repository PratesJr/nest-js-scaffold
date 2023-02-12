
# Description

This Project is a NestJs TypeScript boilerplate for all my personal projects.

## What is included

- Lint Staged
- Husky hooks (commit lint, test coverage)
- ESLINT configuration
- Database Container
- Sequelize ORM
- OAuth2 and Jwt Strategy
- Caching with Redis
- Swagger docs
- examples of unit tests

## Pending  Features

- Jest tests examples (examples of e2e tests)
- RabittMQ

## System Requirements

- _Node_: version >= 16.16
- _NPM_: version >= 8.11
- _NestJs_: >= 9.0.0
- _Docker_: version >= 20.10
- _Docker Compose_: version >= 1.29

## Installation

```bash
npm install
```

```bash
touch .env && cp .env.example .env
```

- After this commands you'll need to add the database values on you env file, then run the following command

```bash
docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Marcelo Prates] - mpratesjunior@gmail.com

## License

Nest is [MIT licensed](LICENSE).
