FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend-prueba-tecnica/browser /usr/share/nginx/html
EXPOSE 80


