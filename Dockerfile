# Use the latest node image
FROM node:latest

# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --silent
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# Change to the app directory
WORKDIR /app
COPY . /app

# Expose browser-sync port
EXPOSE 3000

# Start the dev server
CMD npm run dev
