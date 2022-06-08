import express, { Request, Response } from "express";
import morgan from 'morgan'
const app = express();
const port = process.env.PORT || 3000;

let count = 0;

app.use(morgan('combined'))

app.get("/", (req: Request, resp: Response) => {
  resp.send(`pong ${count}`);
  count = count + 1;
});

app.listen(port, () => {
  console.log(`Application running in port ${port}`);
});
