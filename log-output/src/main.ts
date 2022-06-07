import { v4 as uuidv4 } from "uuid";

const id = uuidv4();

const app = () => {
  const date = new Date();
  console.log(`${date.toISOString()} ${id}`);
  setTimeout(app, 5000);
};

app();
