FROM mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

COPY . .
RUN npm install

CMD ["npx", "playwright", "test"]