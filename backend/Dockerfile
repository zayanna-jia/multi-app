# Stage 1: Build - dependencies install хийх
FROM node:18-alpine AS builder

WORKDIR /app

# Package files copy
COPY package*.json ./

# Production dependencies only install
RUN npm install && npm cache clean --force

# Stage 2: Production - эцсийн image
FROM node:18-alpine

WORKDIR /app

# Create non-root user (security)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {r.statusCode === 200 ? process.exit(0) : process.exit(1)})" || exit 1

CMD ["node", "server.js"]