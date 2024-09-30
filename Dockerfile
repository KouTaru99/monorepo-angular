# Use an official Node runtime as the base image
FROM node:18-alpine

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

# Build the application
RUN nx build ng-mf --prod

# Use Nginx to serve the application
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=0 /app/dist/apps/ng-mf /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
