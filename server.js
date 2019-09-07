require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const {typeDefs} = require('./schema');
const resolvers = require('./resolver').resolvers
const config = require('./config/local');

const app = express();



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({
      req
    }) => ({
      token: req.query.token,
      origin: req.headers.origin,
      code: req.query.code,
      request: req
    })
  });



startMongo = (mongoConnect) => {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(mongoConnect.url, mongoConnect.options);
    mongoose.connection.on("connected", () => {
        console.log("connected to mongodb on %s", mongoConnect.url);
    })
    mongoose.connection.on("error", (err) => {
        if (err) {
            console.log("not connected to mongodb due to %s", err);
            process.exit();
        }
    })
};
server.applyMiddleware({ app });

app.listen(config.PORT, () => {
    console.log("server started on 4000 port");
    startMongo(config.mongo)
  });