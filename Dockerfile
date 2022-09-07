FROM node:alpine AS base
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app

FROM base AS builder-server
WORKDIR /home/node/app
COPY --chown=node:node ./package.json ./package.json
USER node
RUN yarn install

FROM base AS production
WORKDIR /home/node/app
# RUN npm install -g nodemon
USER node

COPY --chown=node:node --from=builder-server /home/node/app/node_modules ./node_modules
COPY --chown=node:node ./src ./src
CMD ["yarn", "dev"]