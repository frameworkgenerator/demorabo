# build environment
FROM node:12.4.0-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx
EXPOSE 80
RUN apt-get update && apt-get install -y curl
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
