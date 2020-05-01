FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN yarn install
EXPOSE 3000

CMD ["yarn", "start"]
