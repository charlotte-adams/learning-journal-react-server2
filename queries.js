const Pool = require("pg").Pool;
const pool = new Pool({
  user: "cadams",
  host: "localhost",
  database: "blog_posts"
});
