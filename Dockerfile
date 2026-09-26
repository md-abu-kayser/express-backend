# ================================
# Dependencies Stage
# ================================
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm ci


# ================================
# Build Stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY package*.json ./

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

RUN npm run build


# ================================
# Production Stage
# ================================
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

COPY prisma ./prisma/

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

USER appuser

EXPOSE 3000

CMD ["npm", "start"]