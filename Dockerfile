# Use the latest node image
FROM node:latest

# Create the website dir
RUN mkdir -p /website

# Config
ENV NODE_ENV=development

# Change to the website directory
COPY . /website
WORKDIR /website

# Install dependencies
RUN npm install --silent

# Expose browser-sync port
EXPOSE 3000 3001

# Start the dev server
CMD npm run dev
