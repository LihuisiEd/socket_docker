FROM node:14

WORKDIR /app

COPY index.html .
COPY server.js .

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

CMD ["node", "server.js"]
