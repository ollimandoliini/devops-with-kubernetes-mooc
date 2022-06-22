import { v4 as uuidv4 } from "uuid";
import express, { Request, Response } from "express";

const id = uuidv4();

const app = express();
const port = process.env.PORT;
const message = process.env.MESSAGE;

app.get("/", async (req: Request, resp: Response) => {
  try {
    const timestamp = await fetch("http://timestamp-svc").then((response) =>
      response.text()
    );
    const count = await fetch("http://ping-pong-application-svc/count").then(
      (response) => response.text()
    );
    resp.send(
      `${message}\n
       ${timestamp}: ${id}\n
       Ping / Pongs: ${count}`
    );
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => console.log(`Application running in port ${port}`));
