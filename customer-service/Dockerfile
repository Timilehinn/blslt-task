FROM node:17

# work directory
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

RUN npm run build


EXPOSE 3002

CMD [ "node", "dist/server.js" ]