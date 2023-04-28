FROM node:16.19.0


WORKDIR /Template_NestJS

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD npm run start