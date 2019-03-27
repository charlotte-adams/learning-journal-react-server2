const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PSWD,
  port: process.env.DB_PORT
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Get all posts
const getPosts = (request, response) => {
  pool.query("SELECT * FROM blog_posts ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// Get single post by id
const getPostById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM  blog_posts WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
// Add a new post
const createPost = (request, response) => {
  const { title, author, created_on, body, tags } = request.body;

  pool.query(
    "INSERT INTO blog_posts (title, author, created_on, body, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, author, created_on, body, tags],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Post added with ID: ${results.rows[0].id}`);
    }
  );
};
// update post
const updatePost = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, author, created_on, body, tags } = request.body;

  pool.query(
    "UPDATE blog_posts SET title = $1, author = $2, created_on = $3, body = $4, tags = $5 WHERE id = $6",
    [title, author, created_on, body, tags, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Post modified with ID: ${id}`);
    }
  );
};

// delete a post
const deletePost = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT FROM blog_posts WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Blog Post deleted with ID: ${id}`);
  });
};
//  get all author names - no duplicates
const getAllAuthorNames = (request, response) => {
  pool.query("SELECT DISTINCT author FROM blog-posts", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getAllAuthorNames
};
