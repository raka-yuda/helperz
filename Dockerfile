# Install dependencies stage
FROM node:18-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /home/app
COPY package*.json ./
RUN npm ci

# Builder stage
FROM node:18-alpine AS builder
WORKDIR /home/app
COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . .
COPY .env.production .env

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /home/app

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only necessary files for standalone mode
COPY --from=builder /home/app/.next/standalone ./
COPY --from=builder /home/app/.next/static ./.next/static
COPY --from=builder /home/app/public ./public
COPY --from=builder /home/app/.env ./.env

# Set correct permissions
RUN chown -R nextjs:nodejs /home/app

# Switch to non-root user
USER nextjs

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]