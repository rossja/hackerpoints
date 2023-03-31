FROM node:19-alpine

LABEL maintainer="Jason Ross <algorythm@gmail.com>"

WORKDIR /app
COPY src/package*.json .
RUN npm install

COPY src/app.js .
EXPOSE 3000

CMD ["node", "app.js"]
