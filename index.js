const express = require("express");
const initDB = require("./config/database");
const expressConfig = require("./config/express");
const { isLoggedIn } = require("./middleware/guards");


const { home } = require("./controllers/home");
const { logout } = require("./controllers/logout");
const { notFound } = require("./controllers/notFound");
const { catalog } = require("./controllers/catalog");
const { myPosts } = require("./controllers/myPosts");
const { details } = require("./controllers/details");
const { delPost } = require("./controllers/delete");
const { vote } = require("./controllers/vote");

const login = require("./controllers/login");
const register = require("./controllers/register");
const create = require("./controllers/create");
const edit = require("./controllers/edit");

start();

async function start() {
  const app = express();
  expressConfig(app);
  await initDB();

  app.get("/", home);
  app.get("/logout", logout);
  app.get("/all-posts", catalog);
  app.get("/my-posts", isLoggedIn(), myPosts);
  app.get("/details/:id", details);
  app.get("/delete/:id", isLoggedIn(), delPost);
  app.get("/vote/:id/:value", isLoggedIn(), vote);

  app.route("/login")
  .get(login.get)
  .post(login.post);

  app.route("/register")
  .get(register.get)
  .post(register.post);

  app.route("/create")
  .get(isLoggedIn(), create.get)
  .post(isLoggedIn(), create.post);

  app.route("/edit/:id")
  .get(isLoggedIn(), edit.get)
  .post(isLoggedIn(), edit.post);

  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started at port 3000"));
}
