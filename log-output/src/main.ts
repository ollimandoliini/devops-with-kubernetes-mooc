import { v4 as uuidv4 } from "uuid";
import express, { Request, Response } from "express";

const id = uuidv4();

const app = express();
const port = process.env.PORT

app.get("/", (req: Request, resp: Response) => {
  const date = new Date()
  resp.send(`${date.toISOString()} ${id}`);
});

app.listen(port, () => 
  console.log(`Application running in port ${port}`)
)
