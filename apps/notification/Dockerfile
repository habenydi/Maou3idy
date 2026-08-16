FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Note: this service has prisma/@prisma-client in package.json and a
# notification_db postgres container in its docker-compose.yml, but there is
# no prisma/schema.prisma and no PrismaService anywhere in src/ — it's
# currently stateless (email-sending only), so there's nothing to generate
# or migrate here. See mistake.md.

EXPOSE 1338

CMD ["npm", "run", "start:dev"]
