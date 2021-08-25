FROM node:14.17-alpine
RUN apk add ffmpeg
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
