import express from "express";
import { fetchCustomers } from "../controller/CustomerController";

const router = express.Router();

router.get("/customers", fetchCustomers);

export default router;
