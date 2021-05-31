FROM node:alpine

WORKDIR /usr/apni_dukan_frontend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]