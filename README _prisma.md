# Prisma

## 1. Create TypeScript project and set up Prisma

As a first step, create a project directory and navigate into it:

```bash
$ mkdir hello-prisma
$ cd hello-prisma
```

Next, initialize a TypeScript project using npm:

```bash
$ npm init -y
$ npm install typescript ts-node @types/node --save-dev
```

This creates a package.json with an initial setup for your TypeScript app.

Now, initialize TypeScript:

```bash
$ npx tsc --init
```

Then, install the Prisma CLI as a development dependency in the project:

```bash
$ npm install prisma --save-dev
```

Finally, set up Prisma with the init command of the Prisma CLI:

```bash
$ npx prisma init --datasource-provider sqlite
```

This creates a new prisma directory with your Prisma schema file and configures SQLite as your database. You're now ready to model your data and create your database with some tables.

## 2. Model your data in the Prisma schema

The Prisma schema provides an intuitive way to model data. Add the following models to your schema.prisma file:

```javascript
prisma/schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```
