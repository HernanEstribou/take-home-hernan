ARG NODE_VERSION=18.20.7

# Base: dependencias comunes 
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
COPY package*.json ./

# Etapa de producción 
FROM base AS production
RUN npm ci --omit=dev
COPY --chown=node:node . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate
USER node
EXPOSE 5173
CMD ["node", "src/app.js"]

# Etapa de tests
FROM base AS test
RUN npm ci --include=dev
COPY --chown=node:node . .
COPY --chown=node:node test ./test
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate
USER node
CMD ["npm", "run", "test"]