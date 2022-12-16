const express = require("express");
const initDB = require("./config/database");
const expressConfig = require('./config/express');

start();

async function start() {
  const app = express();
  expressConfig(app);
  await initDB();

  app.listen(3000, () => console.log("Server started at port 3000"));
}