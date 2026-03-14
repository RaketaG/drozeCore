FROM node:24.14.0
WORKDIR /laverna
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 443
CMD npm run db_init && npm run start