FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only production; \
        fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "app.js"]