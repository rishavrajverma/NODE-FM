import { Request, Response, NextFunction } from "express";
import { CreateCustomerInput } from "../dto";

export const CreateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, mobile } = <CreateCustomerInput>req.body;

  res.json({ name, email, mobile });
};

export const GetCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetByIDCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
