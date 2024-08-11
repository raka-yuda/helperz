FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

COPY .env.production .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]