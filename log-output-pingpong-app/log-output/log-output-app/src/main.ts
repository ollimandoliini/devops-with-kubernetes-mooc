import { v4 as uuidv4 } from "uuid";
import express, { Request, Response } from "express";

const id = uuidv4();

const app = express();
const port = process.env.PORT;

app.get("/", async (req: Request, resp: Response) => {
  try {
    const timestamp = await fetch("http://timestamp-svc").then((response) =>
      response.text()
    );
    const count = await fetch("http://ping-pong-application-svc/count").then(
      (response) => response.text()
    );
    resp.send(
      `${timestamp}: ${id}
     Ping / Pongs: ${count}`
    );
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => console.log(`Application running in port ${port}`));
