FROM node:20.9-alpine3.18

WORKDIR /app

EXPOSE 3001

COPY package*.json ./

RUN npm ci

COPY . .

ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]