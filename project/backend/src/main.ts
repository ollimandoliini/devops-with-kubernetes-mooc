import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import bodyParser from "body-parser";
import { v4 as uuid4 } from "uuid";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT;
const rootPath = process.env.FILEPATH || ".";

app.get("/api/image", async (req: Request, resp: Response) => {
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

type Todo = {
  id: string;
  name: string;
};

let todos: Todo[] = [];

app.get("/api/todos", (req: Request, resp: Response<Todo[]>) => {
  console.log(todos);
  resp.send(todos);
});

type TodoPayload = {
  name: string;
};

app.post(
  "/api/todos",
  (req: Request<{}, {}, TodoPayload>, resp: Response<string>) => {
    const id = uuid4();
    todos = [...todos, { id, ...req.body }];
    resp.send(id);
  }
);

app.listen(port, () => {
  console.log(`Server started in project ${port}`);
});
