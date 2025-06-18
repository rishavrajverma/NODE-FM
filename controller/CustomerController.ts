import { Request, Response } from "express";
import { getCustomers } from "../services/filemakerService";

export const fetchCustomers = async (req: Request, res: Response) => {
  try {
    const data = await getCustomers();
    
    res.json(data);
  } catch (err) {
    //console.log(err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};
