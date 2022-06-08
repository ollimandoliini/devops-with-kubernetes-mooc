import fs from "fs";

const writeTimeStamp = () => {
  const timeStamp = new Date().toISOString();
  fs.writeFileSync("/app/files/timestamp.txt", timeStamp);
};

const app = () => {
  writeTimeStamp();
  setTimeout(app, 5000);
};

app();
