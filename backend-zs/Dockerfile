FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
#RUN yarn global add nodemon
RUN yarn install
EXPOSE 3001

#CMD ["yarn", "run", "dev"]
CMD ["yarn", "start"]
