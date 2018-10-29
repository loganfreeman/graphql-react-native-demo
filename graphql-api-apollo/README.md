# GraphQL API in Express (Auth JWT, Mutations, Queries)

### Requirements

- Node >= 8.11.2
- MySQL >= 5.6 < 8.0

### Installation

    npm i
    cp ./src/config.ts.dist ./src/config.ts
    vi ./src/config.ts

- Set your database informations
- Set your jwt secret

### Commands

| Description            |                    Command                     |
| ---------------------- | :--------------------------------------------: |
| Create database        |    `npx ts-node ./src/cli database:create`     |
| Drop database          |     `npx ts-node ./src/cli database:drop`      |
| Create database schema | `npx ts-node ./src/cli database:schema:create` |
| Drop database schema   |  `npx ts-node ./src/cli database:schema:drop`  |

### Run development server

    npm start

### Compile and run server

    npm run build
    node ./dist/server.js
