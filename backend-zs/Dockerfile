FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN yarn global add nodemon
RUN yarn install
EXPOSE 3001

CMD ["yarn", "run", "dev"]