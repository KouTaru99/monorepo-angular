# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files first
COPY package*.json ./
COPY nx.json tsconfig*.json ./
COPY apps/ng-mf/package*.json ./apps/ng-mf/
COPY apps/app-remote/package*.json ./apps/app-remote/

# Install dependencies và xóa cache npm luôn
RUN npm ci --quiet && \
    npm install -g nx && \
    npm cache clean --force

# Copy source
COPY . .

# Build apps
ARG API_URL
ARG AUTH_URL
ENV API_URL=$API_URL
ENV AUTH_URL=$AUTH_URL

RUN nx build ng-mf --prod --skip-nx-cache && \
    nx build app-remote --prod --skip-nx-cache

# Production stage
FROM nginx:alpine as production

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy toàn bộ thư mục apps
COPY --from=build /app/dist/apps/ng-mf /usr/share/nginx/html
COPY --from=build /app/dist/apps/app-remote /usr/share/nginx/html/app-remote

# Fix permissions
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod 644 /usr/share/nginx/html/*.* && \
    chmod 644 /usr/share/nginx/html/app-remote/*.*

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx user if it doesn't exist
RUN adduser -D -g 'www' www && \
    chown -R www:www /usr/share/nginx/html

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
