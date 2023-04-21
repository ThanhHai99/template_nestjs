<h1 style="color:skyblue;">Template</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Feature branch

${\color{darkgrey}\textbf{Note}}$ &#58; &emsp;
${\color{red}\textbf{Open}}$ &emsp;
${\color{orange}\textbf{InProress}}$ &emsp;
${\color{green}\textbf{Done}}$ &emsp;

| Branch         | Status                               | Detail                                                                  |
| -------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| master         | ${\color{green}\textbf{Done}}$       | Origin, Logger, Config, Dockerfile, docker-compose, Precommit, Prettier |
| session        | ${\color{red}\textbf{Open}}$         | Session                                                                 |
| cookie         | ${\color{red}\textbf{Open}}$         | Cookie                                                                  |
| cqrs           | ${\color{green}\textbf{Done}}$       | CQRS                                                                    |
| configs        | ${\color{green}\textbf{Done}}$       | Configs                                                                 |
| microservice   | ${\color{green}\textbf{Done}}$       | PubSub, NATs, Microservice                                              |
| typeorm        | ${\color{green}\textbf{Done}}$       | TypeORM, PostgreSQL                                                     |
| prisma         | ${\color{green}\textbf{Done}}$       | Prisma                                                                  |
| caching        | ${\color{green}\textbf{Done}}$       | Redis                                                                   |
| queuing        | ${\color{green}\textbf{Done}}$       | RabbitMQ, (kafka)                                                       |
| mail           | ${\color{green}\textbf{Done}}$       | Send mail                                                               |
| rbac           | ${\color{green}\textbf{Done}}$       | Authentication, Authorization, Permission                               |
| oauth          | ${\color{red}\textbf{Open}}$         |                                                                         |
| cicd           | ${\color{green}\textbf{Done}}$       | CI/CD                                                                   |
| nx             | ${\color{green}\textbf{Done}}$       | NX Workspace                                                            |
| elasticsearch  | ${\color{green}\textbf{Done}}$       | Elasticsearch                                                           |
| mongoose       | ${\color{green}\textbf{Done}}$       | Mongoose, MongoDB                                                       |
| grpc           | ${\color{green}\textbf{Done}}$       |                                                                         |
| firebase       | ${\color{red}\textbf{Open}}$         |                                                                         |
| graphql        | ${\color{orange}\textbf{InProress}}$ | GraphQL                                                                 |
| interceptor    | ${\color{green}\textbf{Done}}$       | Interceptor                                                             |
| image          | ${\color{green}\textbf{Done}}$       | Upload, Download                                                        |
| video          | ${\color{green}\textbf{Done}}$       | Upload, Download, (Streaming)                                           |
| clean          | ${\color{red}\textbf{Open}}$         | Clean architecture                                                      |
| solid          | ${\color{red}\textbf{Open}}$         |                                                                         |
| observer       | ${\color{red}\textbf{Open}}$         | [Design-Pattern] Observer Pattern                                       |
| facade         | ${\color{red}\textbf{Open}}$         | [Design-Pattern] Facede Pattern                                         |
| proxy          | ${\color{orange}\textbf{InProress}}$ | [Design-Pattern] Proxy Pattern                                          |
| simple_factory | ${\color{red}\textbf{Open}}$         | [Design-Pattern] Simple Factory Pattern                                 |
| factory_method | ${\color{red}\textbf{Open}}$         | [Design-Pattern] Factory Method Pattern                                 |
| singleton      | ${\color{green}\textbf{Done}}$       | [Design-Pattern] Singleton Pattern                                      |
| prototype      | ${\color{red}\textbf{Open}}$         | [Design-Pattern] Prototype Pattern                                      |

## Version

NestJS `v9.2.0`<br/>
NodeJS `v16.19.0`<br/>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
