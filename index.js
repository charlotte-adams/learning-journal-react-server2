const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const db = require("./queries");
var cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres blog_posts" });
});

app.get("/blog_posts", db.getPosts);
app.get("/blog_posts/:id", db.getPostById);
app.get("/current_blog_post", db.getMostCurrentPost);
app.post("/blog_posts", db.createPost);
app.put("/blog_posts/:id", db.updatePost);
app.delete("/blog_posts/:id", db.deletePost);
app.get("/blog_posts/:author", db.getAllAuthorNames);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
