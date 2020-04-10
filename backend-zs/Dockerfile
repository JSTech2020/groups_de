FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN npm install -g --save nodemon
RUN yarn install
EXPOSE 3001

CMD ["yarn", "run", "dev"]