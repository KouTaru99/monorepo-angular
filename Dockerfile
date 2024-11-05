# Build stage
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g nx

# Thêm build arg
ARG REMOTE_URL
ENV REMOTE_URL=$REMOTE_URL

RUN nx reset
RUN nx run-many --target=build --projects=ng-mf,app-remote --prod

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/apps/ng-mf /usr/share/nginx/html
COPY --from=build /app/dist/apps/app-remote /usr/share/nginx/html/app-remote
COPY nginx.conf /etc/nginx/conf.d/default.conf
