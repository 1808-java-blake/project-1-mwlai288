import { Request, Response } from "express";
import express from "express";
import * as reimbursementDao from "../dao/reimbursement-dao";
import { authMiddleware } from "../security/authorization-middleware";

// all routes defiend with this object will imply /reimbursements
export const reimbursementRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Find all reimbursements
 */
reimbursementRouter.get("", [
  // authMiddleware("manager", 'employee'),
  async (req: Request, resp: Response) => {
    try {
      console.log("retrieving all reimbursement requests");
      let req = await reimbursementDao.findAll();
      resp.json(req);
    } catch (err) {
      resp.sendStatus(500);
    }
  }
]);

// /**
//  * Find reimbursement by id
//  */
reimbursementRouter.get("/:id", async (req, res) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving movie with id  ${id}`);
  try {
    let reimbursement = await reimbursementDao.findById(id);
    if (reimbursement !== undefined) {
      res.json(reimbursement);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/**
 * Create Reimbursement
 */
reimbursementRouter.post("", [
  // authMiddleware("2"),
  async (req, res) => {
    try {
      const id = await reimbursementDao.createReimbursement(req.body);
      res.status(201);
      res.json(id);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
      console.log("reimbursement request created");
      res.json("reimbursement request created");
    }
  }
]);
