import { v4 as uuidv4 } from "uuid";
import express, { Request, Response } from "express";
import morgan from "morgan";

const id = uuidv4();

const app = express();
const port = process.env.PORT;
const message = process.env.MESSAGE;

app.use(morgan("combined"))

app.get("/", async (req: Request, resp: Response) => {
  const timestamp = await fetch("http://timestamp-svc").then((response) =>
    response.text()
  );
  const count = await fetch(
    "http://ping-pong-application-svc/pingpong/count"
  ).then((response) => response.text());
  resp.send(
    `${message}\n
       ${timestamp}: ${id}\n
       Ping / Pongs: ${count}`
  );
});

app.listen(port, () => console.log(`Application running in port ${port}`));
