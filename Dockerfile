FROM node:14

WORKDIR /app

COPY package*.json ./

# RUN npm cache clean --force

RUN npm cache clean --force && \
    rm -rf node_modules && \
    npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]
