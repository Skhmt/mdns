# build
FROM node:24.1-alpine3.20 AS build
WORKDIR /home/node/app
COPY . .
RUN npm install 
RUN npm run build

# create the lean image
FROM node:24.1-alpine3.20
WORKDIR /home/node/app
COPY --from=build /home/node/app/dist/index.js ./index.mjs
CMD ["node", "--disable-warning=ExperimentalWarning", "index.mjs"]