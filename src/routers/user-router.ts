import { Request, Response } from "express";
import express from "express";
import * as userDao from "../dao/user-dao";

// all routes defiend with this object will imply /movies
export const userRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Find all users
 */
userRouter.get("", async (req: Request, resp: Response) => {
  try {
    console.log("retrieving all users");
    let users = await userDao.findAll();
    resp.json(users);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

/**
 * Find user by id
 */
userRouter.get("/:id", async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  try {
    let user = await userDao.findById(id);
    console.log(user);
    if (user !== undefined) {
      req.session.user = user;
      resp.json(user);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

/**
 * Add a new user
 */
userRouter.post("", async (req, res) => {
  console.log("creating user");
  try {
    const id = await userDao.createUser(req.body);
    res.status(201);
    res.json(id);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * Add a reimbursement to users list
 */
userRouter.post("/:id/reimbursement", async (req, resp) => {
  console.log("creating user");
  try {
    const { reimbursementId } = req.body;
    const id = await userDao.addReimbursementRequest(
      reimbursementId,
      req.params.id
    );
    resp.sendStatus(201);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

/**
 * Login with username and password
 */

userRouter.post("/login", async (req, res) => {
  try {
    const { ers_username, ers_password } = req.body;
    const user = await userDao.findByUsernameAndPassword(
      ers_username,
      ers_password
    );
    if (user) {
      req.session.user = user;
      console.log(user);
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
