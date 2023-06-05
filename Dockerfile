# Stage 1: Build the Angular application
FROM node:14.17.0 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the application
RUN npm run build --prod

# Stage 2: Create a lightweight image to serve the built files
FROM nginx:1.21.0-alpine

# Copy the built files from the previous stage
COPY --from=builder /app/dist/alert-map-info /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
