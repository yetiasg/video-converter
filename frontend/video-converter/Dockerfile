FROM node:alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
CMD ["npm", "run", 'serve']
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html