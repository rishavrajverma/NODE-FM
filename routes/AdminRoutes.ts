import express, { Request, Response, NextFunction } from "express";
import { CreateCustomer, GetByIDCustomer, GetCustomer } from "../controller";

const router = express.Router();
router.post("/customers", CreateCustomer);
router.get("/customers", GetCustomer);
router.get("/customers/:id", GetByIDCustomer);

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello from admin " });
});

export { router as AdminRoute };
