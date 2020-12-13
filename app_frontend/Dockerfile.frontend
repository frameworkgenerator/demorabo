FROM tiangolo/node-frontend:10 as builder
RUN mkdir -p ~/app
COPY . /app
WORKDIR /app

FROM nginx:1.15 as production
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /app/default.conf /etc/nginx/conf.d/
RUN cd /usr/share/nginx/html
RUN ls -a
EXPOSE 80
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
