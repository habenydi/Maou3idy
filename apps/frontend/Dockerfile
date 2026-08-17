FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# -H 0.0.0.0 so the dev server is reachable from outside the container
# (Next's dev server otherwise only binds locally). Shell form so $PORT
# (set by docker-compose from the root .env) is actually honored instead of
# a port hardcoded here.
CMD npx next dev -H 0.0.0.0 -p ${PORT:-3000}
