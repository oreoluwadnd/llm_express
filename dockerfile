# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm ci

# Copy the application source code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port on which the application will run (adjust if necessary)
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "run" , "dev"]