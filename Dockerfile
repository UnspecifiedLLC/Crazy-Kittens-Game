FROM node
RUN mkdir /src
WORKDIR /src
COPY . /src
RUN npm install -g http-server

CMD ["http-server", "."]
