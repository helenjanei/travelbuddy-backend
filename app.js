const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const { errorHandler } = require("./errorHandler");

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: errorHandler,
  })
);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = app;
