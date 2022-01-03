import express from "express";
import passport from "passport";
import { PORT } from "./config/config";
import { connectMongoDB } from "./config/database";
import { errorHandler, notFound } from "./middleware/errorHandler";
import router from "./routes/auth.routes";

require("dotenv").config();
let app = express();
const cors = require("cors");

const middleware = [
  express.json(),
  express.urlencoded({ limit: "30mb", extended: true }),
  cors(),
  passport.initialize(),
];

// Middleware to accept body
app.use(middleware);

const start = async (): Promise<void> => {
  //database connect
  await connectMongoDB();
  // route connect
  app.use("/api", router);

  // error handler
  app.use(notFound);
  app.use(errorHandler);
  // start the express server
  await app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${PORT}`);
  });
};

start();
