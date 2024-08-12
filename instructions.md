# Integrum ESG interview - Card App 🎴🃏

Simple card app created with Typescript Stack
Converted to a test from the [original](https://github.com/ThomiWidescreen/card-app-typescript)

## Prerequisites

NodeJS - if you don't already have it installed, check out [nvm](https://github.com/nvm-sh/nvm).

### Development set-up

If you don't have a favorite editor we highly recommend [VSCode](https://code.visualstudio.com).

Recommended VSCode extensions:

- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

# Instruction to candidates

Your assignment is to improve this application. At the moment the application is simple and can only create and remove todos.

Fork this project into your own on github

Clone it onto a machine with node and a development environment (we use VScode)
Follow the instructions below to run the back end and the front end.

Then make changes to:

- Add a dark mode. Create a settings dialog to set it - and change the styling to render a dark mode. Consider how the current setting is passed to the components (and describe it in your covering email)
- Add a scheduled date to the cards. This involves adding a column in the database, changing the backend service and changing the frontend card entry and display components
- Add tests to the backend. There are some clues [here](https://www.fastify.io/docs/latest/Guides/Testing/) and [here](https://jestjs.io/docs/using-matchers).

If you feel constrained by time (which is totally fine!), prioritize quality over quantity.

Email us the link to your repo when you're done. Please also include a short write up describing the rationale of the changes you have made.

# Features

- Mutiple Routes for each action.
- Local Backend Database
- You can View, Create, Update, Delete simple cards.

# Stack

## Front End

- React ⚛
- React Router DOM 🔀
- Tailwind CSS 🐦

## Back End

- Fastify 🚀
- Prisma ORM 🅿
- SQLite ▪

# Deploy

Git hooks are used to automatically format committed files. To setup the hooks run:

```bash
npm i
```

The front end works in port 3000 and the backend works in the port 3001.

## Back End

```bash
npm install

npm run prisma-setup

npm start
```

To have the backend restart when changes have been made to `.ts`, `.prisma` and `.sql` files:

Replace `npm start` with `npm run dev`

To run the tests:

```bash
npm run test
```

## Front End

```bash
npm install

npm start
```

To deploy a final build with static files:

```bash
npm run build

cd ./dist

npx serve -p 3000 -s
```
