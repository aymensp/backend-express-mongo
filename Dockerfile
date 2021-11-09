FROM node:12-alpine

WORKDIR /usr/ayman

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]