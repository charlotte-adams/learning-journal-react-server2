const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres blog_posts" });
});

app.get("/blog_posts", db.getPosts);
app.get("/blog_posts/:id", db.getPostById);
app.post("/blog_posts", db.createPost);
app.put("/blog_posts/:id", db.updatePost);
app.delete("/blog_posts/:id", db.deletePost);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
