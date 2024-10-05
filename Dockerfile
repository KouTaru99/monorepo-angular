# Build stage
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Install Nx globally
RUN npm install -g nx

# Build all applications (adjust this command based on your Nx workspace configuration)
RUN nx run-many --target=build --all --prod

# Nginx stage
FROM nginx:alpine

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy all built applications to Nginx
COPY --from=build /app/dist/apps /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
