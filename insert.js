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

const created_on = new Date();

pool.query(
  "INSERT INTO blog_posts (title, author, created_on, body, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *",
  [
    "my title",
    "mickey mouse",
    "created_on",
    "Winnie the Pooh likes honey!",
    ["honey", "bees"]
  ],
  // [title, author, created_on, body, tags]
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`Post added with ID: ${results.rows[0].id}`);
  }
);
