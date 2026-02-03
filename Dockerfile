ARG NODE_VERSION=18.20.7

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate

USER node

EXPOSE 5173

CMD ["node", "src/app.js"]