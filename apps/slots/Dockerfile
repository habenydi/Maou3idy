FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# node_modules/.prisma is generated from schema.prisma and isn't checked in,
# so without this the container crashes on boot looking for @prisma/client.
RUN npx prisma generate

EXPOSE 1339

# Apply any pending migrations against the DB this container is wired to,
# then start the app.
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]
