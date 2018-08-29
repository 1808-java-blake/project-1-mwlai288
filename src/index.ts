require("dotenv").config();
import express from "express";
import path from "path";
import bodyParser from "body-parser";
// import session from 'express-session';
import { userRouter } from "./routers/user-router";

// create the app object from express
const app = express();

// set the port
const port = process.env.PORT || 3001; // will use port from computers environment variables or 3000 if there is none
app.set("port", port);

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Sup Bro. You got this working.");
});
// use the body parser to convert request json
app.use(bodyParser.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(
    `App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
});
