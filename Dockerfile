FROM node:8
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python get-pip.py
RUN apt-get update && apt-get install -y python-pip libpython-dev
RUN pip install awscli
ENV IS_OFFLINE ${IS_OFFLINE:-true}
ENV LOCAL_DYNAMODB_ENDPOINT ${LOCAL_DYNAMODB_ENDPOINT:-http://db:8000}
ENV ORDERS_TABLE ${ORDERS_TABLE:-orders-table-dev}
RUN groupadd -r nodejs && useradd -m -r -g nodejs --shell /bin/bash nodejs
USER nodejs
RUN mkdir /home/nodejs/app
WORKDIR /home/nodejs/app
COPY package.json .
RUN npm install --production
COPY --chown=nodejs:nodejs . .
EXPOSE 4000
CMD ["node", "index.js"]