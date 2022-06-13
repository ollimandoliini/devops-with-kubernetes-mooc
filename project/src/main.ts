import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createWriteStream, existsSync, fstat } from "fs";
import { writeFile } from "fs/promises";
import { resolve } from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;
const rootPath = process.env.FILEPATH || ".";

app.get("/image", async (req: Request, resp: Response) => {
  const imageFileName = new Date().toISOString().split("T")[0];
  const filePath = resolve(`${rootPath}/${imageFileName}.jpg`);
  resp.type("jpeg");
  if (existsSync(filePath)) {
    console.log("File exists, sending");
    resp.sendFile(filePath);
  } else {
    console.log("File does not exist, downloading file");
    const res = await fetch("https://picsum.photos/1200");
    const blob = await res.blob();
    await writeFile(filePath, blob.stream());
    console.log("File downloaded, sending");
    resp.sendFile(filePath);
  }
});

app.get("/", (req: Request, resp: Response) => {
  resp.type("html");
  resp.send('<html><body>Moro <img src="/image"> </body></html>');
});

app.listen(port, () => {
  console.log(`Server started in project ${port}`);
});
