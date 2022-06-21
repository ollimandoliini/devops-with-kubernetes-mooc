FROM node:18 as build

WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
RUN npm install

COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.21

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .

CMD ["nginx", "-g", "daemon off;"]
