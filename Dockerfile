# ── Stage 1: Install dependencies ──────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Stage 2: Build the Next.js app ─────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Build-time env vars (these will be public in JS bundle — safe for demo)
ARG NEXT_PUBLIC_GEMINI_API_KEY
ARG NEXT_PUBLIC_REMOVE_BG_API_KEY
ARG NEXT_PUBLIC_FASTAPI_ML_URL
ENV NEXT_PUBLIC_GEMINI_API_KEY=$NEXT_PUBLIC_GEMINI_API_KEY
ENV NEXT_PUBLIC_REMOVE_BG_API_KEY=$NEXT_PUBLIC_REMOVE_BG_API_KEY
ENV NEXT_PUBLIC_FASTAPI_ML_URL=$NEXT_PUBLIC_FASTAPI_ML_URL
RUN npm run build

# ── Stage 3: Minimal production runner ─────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only what the standalone build needs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Next.js standalone server entry point
CMD ["node", "server.js"]
