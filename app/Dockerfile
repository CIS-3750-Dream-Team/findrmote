FROM node:14-alpine as build

WORKDIR /app
COPY package.json /app
RUN npm install
COPY src /app/src
COPY public /app/public
COPY .env.prod /app/.env
RUN npm run build

FROM nginx:1.16.0-alpine
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
