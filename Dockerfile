FROM node:16.19.0-alpine as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:16.19.0-alpine as prod-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --ignore-scripts

EXPOSE 80

CMD ["node", "/app/main.js"]
