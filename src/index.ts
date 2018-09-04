require("dotenv").config();
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import { userRouter } from "./routers/user-router";
import { reimbursementRouter } from "./routers/reimbursement-router";

// create the app object from express
const app = express();

// set the port
const port = 3001; // will use port from computers environment variables or 3001 if there is none
app.set("port", port);

const sess = {
  secret: "keyboard cat",
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// register session middleware
app.use(session(sess));

// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(express.static(path.join(__dirname, "public")));

// use the body parser to convert request json
app.use(bodyParser.json());

// allows cors headers
app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "http://localhost:3000");
  resp.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  resp.header("Access-Control-Allow-Credentials", "true");
  next();
});

/*********************************************************************************************
 * API Routers
 ********************************************************************************************/
app.use("/users", userRouter);
app.use("/reimbursement", reimbursementRouter);

app.listen(port, () => {
  console.log(
    `App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
});
