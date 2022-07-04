FROM node:18

WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
COPY src ./

COPY prisma ./prisma/
RUN npm run prisma-generate

RUN npm run build

CMD npx prisma migrate deploy && node "./build/main.js"
