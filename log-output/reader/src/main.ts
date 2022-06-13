import { v4 as uuidv4 } from "uuid";
import express, { Request, Response } from "express";
import fs from "fs/promises";

const id = uuidv4();

const app = express();
const port = process.env.PORT;

app.get("/", async (req: Request, resp: Response) => {
  const timestamp = await fs
    .readFile("/app/files/timestamp.txt")
    .catch(() => 0)
    .then((buffer) => buffer.toString());
    
  const count = await fs
    .readFile("/app/files/count.txt")
    .catch(() => 0)
    .then((buffer) => buffer.toString());

  resp.send(
    `${timestamp}: ${id}
     Ping / Pongs: ${count}`
  );
});

app.listen(port, () => console.log(`Application running in port ${port}`));
