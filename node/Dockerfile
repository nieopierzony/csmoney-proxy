FROM node:16

# Copy local code to the container image.
ENV APP_HOME /srv/node
WORKDIR $APP_HOME

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD [ "node", "." ]