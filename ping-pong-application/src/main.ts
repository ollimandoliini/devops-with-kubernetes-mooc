import express, { Request, Response } from "express";
import morgan from "morgan";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

let count = 0;

app.use(morgan("combined"));

app.get("/", (req: Request, resp: Response) => {
  resp.send(`pong ${count}`);
  count = count + 1;
  fs.writeFileSync("/app/files/count.txt", String(count));
});

app.listen(port, () => {
  console.log(`Application running in port ${port}`);
});
