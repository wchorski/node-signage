FROM node:17 as build

LABEL version="0.0.1"
LABEL description="React Frontend for Node Signage "

WORKDIR /app
COPY package*.json /app/

RUN mkdir -p /app/node_modules
RUN chown node:node /app/node_modules
RUN npm install --only=production

COPY . /app

RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf 
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]