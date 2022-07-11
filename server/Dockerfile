FROM node:17 as build

LABEL version="0.0.1"
LABEL description="Express Backend for Node Signage "

WORKDIR /app
COPY package*.json ./

RUN mkdir -p /app/node_modules
RUN chown node:node /app/node_modules

ARG NODE_ENV
RUN npm install --only=production


COPY . ./

EXPOSE $PORT

CMD ["node", "server"]