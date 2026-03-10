FROM node:24.14.0
COPY . /laverna
EXPOSE 3000
WORKDIR /laverna
CMD node laverna.js