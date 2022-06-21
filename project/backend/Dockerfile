FROM node:18

WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
COPY src ./

RUN npm run build

CMD ["node", "./build/main.js"]
