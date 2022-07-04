import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import bodyParser from "body-parser";
import { PrismaClient, Todo } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

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

app.get("/api/todos", async (req: Request, resp: Response<Todo[]>) => {
  const todos = await prisma.todo.findMany();
  resp.send(todos);
});

type TodoPayload = {
  name: string;
};

app.post(
  "/api/todos",
  async (req: Request<{}, {}, TodoPayload>, resp: Response<Todo>) => {
    const todo = await prisma.todo.create({ data: req.body });
    resp.send(todo);
  }
);

const main = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server started in project ${port}`);
    });
  } finally {
    await prisma.$disconnect();
  }
};

main();
