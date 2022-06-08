import { v4 as uuidv4 } from "uuid";
import express, { Request, Response } from "express";
import fs from "fs";

const id = uuidv4();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, resp: Response) => {
  try {
    const content = fs.readFileSync("/app/files/timestamp.txt");
    resp.send(`${content} ${id}`);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => console.log(`Application running in port ${port}`));
