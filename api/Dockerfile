FROM node:14-alpine

WORKDIR /api

COPY package.json /api
RUN npm install
COPY app.js /api
COPY .env.prod /api/.env
COPY routes/ /api/routes

CMD ["npm", "start"]
