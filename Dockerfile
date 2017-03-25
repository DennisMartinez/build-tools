# Use the latest node image
FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json to the image and install dependencies
COPY package.json /usr/src/app
RUN npm install --silent

# Copy app source into the node image
COPY . /usr/src/app

# Expose browser-sync port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "dev"]
