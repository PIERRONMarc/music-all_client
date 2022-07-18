FROM node:18.6.0-alpine AS development
ENV NODE_ENV development
EXPOSE 3000
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy app files
COPY . .

# Start the app
CMD [ "npm", "start" ]