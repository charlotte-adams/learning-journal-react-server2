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

pool.query(
  "INSERT INTO blog_posts (title, author, body, tags) VALUES ($1, $2, $3, $4,) RETURNING *",
  [
    "my title",
    "mickey mouse",
    "Winnie the Pooh likes honey!",
    ["honey", "bees"]
  ],
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log(`Post added with ID: ${results.rows[0].id}`);
  }
);
