FROM node:18 as frontend

WORKDIR /app/frontend
COPY frontend/package*.json frontend/tsconfig.json ./
RUN npm install

COPY frontend/src ./src
COPY frontend/public ./public

RUN npm run build

FROM node:18

WORKDIR /app/backend
COPY backend/package*.json backend/tsconfig.json ./
RUN npm install
COPY backend/src ./
COPY --from=frontend /app/frontend/build /app/frontend/build
COPY --from=frontend /app/frontend/public /app/frontend/public

RUN npm run build

CMD ["node", "./build/main.js"]
