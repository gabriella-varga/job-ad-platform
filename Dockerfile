# Step 1: Use an official Node.js runtime as a parent image
FROM node:16-alpine AS build-stage

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the Vue.js application
RUN npm run build

# Step 7: Use a new Nginx image to serve the built files
FROM nginx:stable-alpine AS production-stage

# Step 8: Copy the built files from the previous stage to the Nginx public directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
