FROM node:12

COPY . /app
WORKDIR /app

# RUN npm install --global yarn --force

RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:rotateInterval '0 0 0 * *'
RUN pm2 set pm2-logrotate:retain 7

RUN yarn global add sequelize-cli
RUN yarn install --production

ENV NODE_ENV=production
EXPOSE 3001
CMD [ "yarn", "start"]
