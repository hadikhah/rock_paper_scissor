FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY index.ts ./

# Expose port and start the app
EXPOSE $PORT
CMD [ "npm","run","dev" ]