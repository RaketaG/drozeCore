FROM node:24.14.0
WORKDIR /drozeCore
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 443
CMD npm start