FROM node:14.18-alpine

WORKDIR /home/ubuntu/dev-chingari-chat-helper

COPY package.json ./
#RUN apk add --no-cache git
RUN npm install

RUN npm install -g pm2

COPY . .

EXPOSE 4011

CMD pm2-runtime start ecosystem.config.js --env development && tail -f /dev/null
