# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Bundle app source code
COPY . .

# Expose the port your Express app is listening on 
EXPOSE 8080

# Start the Express app
CMD ["nodemon", "server.js"]
