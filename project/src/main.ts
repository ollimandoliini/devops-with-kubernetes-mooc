import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, resp: Response) => {
  resp.type("html");
  resp.send("<html><body>Moro</body></html>");
});

app.listen(port, () => {
  console.log(`Server started in project ${port}`);
});
