import pg from "pg";


const dbUsername = process.env.DB_USER || "user"
const dbPassword = process.env.DB_PASSWORD || "password"
const dbDatabase = process.env.DB_DATABASE || "default"
const dbHost = process.env.DB_HOST || "localhost"
const dbPort = process.env.DB_PORT || "5432"

console.log({
  dbUsername,
  dbPassword,
  dbDatabase,
  dbHost,
  dbPort
})

const initDb = async () => {
  const pool = new pg.Pool({
    user: dbUsername,
    password: dbPassword,
    database: dbDatabase,
    host: dbHost,
    port: Number(dbPort)
  });
  const client = await pool.connect();
  const query = "CREATE TABLE IF NOT EXISTS count (id SERIAL PRIMARY KEY);";
  await client.query(query);
  return pool;
};

const pool = await initDb();

export default pool;
