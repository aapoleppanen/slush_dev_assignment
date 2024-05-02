# client build

FROM node:lts-alpine as build

WORKDIR /app

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm run build

# server build

FROM node:lts-alpine as server

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server/ .

RUN npm run build

COPY --from=build /app/dist /app/client/dist

EXPOSE 8080

CMD ["npm", "start"]
