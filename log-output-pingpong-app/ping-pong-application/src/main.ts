import express, { Request, Response } from "express";
import morgan from "morgan";
import pool from "./database.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan("combined"));

app.get("/", (req: Request, resp: Response) => {
  resp.send();
});

app.get("/pingpong", async (req: Request, resp: Response) => {
  await pool.query("INSERT INTO count DEFAULT VALUES");
  const result = await pool.query("SELECT count(*) FROM count");
  const count = result.rows[0].count;
  resp.send(`pong ${count}`);
});

app.get("/pingpong/count", async (req: Request, resp: Response) => {
  const result = await pool.query("SELECT count(*) FROM count");
  const count = result.rows[0].count;
  resp.send(String(count));
});

app.listen(port, () => {
  console.log(`Application running in port ${port}`);
});
