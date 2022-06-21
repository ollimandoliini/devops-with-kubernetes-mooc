import fs from "fs";
import express, { Request, Response } from "express";

let timestamp = new Date().toISOString();
const port = process.env.PORT || 3000;
const app = express();

setInterval(() => {
  timestamp = new Date().toISOString();
}, 5000);

app.get("/", (req: Request, res: Response) => {
  res.send(timestamp);
});

app.listen(port, () => {
  console.log(`Application running in port ${port}`);
});
