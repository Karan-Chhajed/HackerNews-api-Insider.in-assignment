FROM node:8

RUN mkdir -p /src
#app directory
WORKDIR /src

#install dependencies
COPY package*.json ./
RUN npm install

#Bundling
COPY ./ .

EXPOSE 5000

CMD [ "npm", "run", "server" ]