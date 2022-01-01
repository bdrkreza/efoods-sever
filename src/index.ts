import express from "express";
import { PORT } from "./config";
let app = express();
const cors = require("cors");
require("dotenv").config();

const middleware = [
  express.json(),
  express.urlencoded({ limit: "30mb", extended: true }),
  cors(),
];

app.use(middleware);

const start = async (): Promise<void> => {
  app.use("/", (req, res) => {
    res.send(`Other request:\n${req.method} at \n` + new Date());
  });

  // start the express server

  await app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${PORT}`);
  });
};

start();
