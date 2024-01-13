FROM node:alpine

RUN npm install -g pm2

# Set the working directory in the container
WORKDIR /usr/app

# Copy package.json  to the working directory
COPY ./package.json ./
RUN npm install

# Make sure you delete the node_modules folder from the host machine
COPY ./ ./
RUN npm run build

CMD ["npm", "run", "docker-start"]