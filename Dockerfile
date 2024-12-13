# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port React uses
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]