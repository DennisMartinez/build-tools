# Use the latest node image
FROM node:latest

# Copy our app into the image app location
COPY . /usr/src/app

# Change to the current working directory
WORKDIR /usr/src/app

# Expose browser-sync port
EXPOSE 3000

# Run the app
CMD npm install --silent && npm run dev
