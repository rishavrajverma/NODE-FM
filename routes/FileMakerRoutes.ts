import express from "express";
import {
  getLayoutRecords,
  getRecordById,
  createNewRecord,
  updateExistingRecord,
  deleteExistingRecord,
} from "../controller/FilemakerController";

const router = express.Router();

router.get("/:layout/records", getLayoutRecords);
router.get("/:layout/records/:recordId", getRecordById);
router.post("/:layout/records", createNewRecord);
router.patch("/:layout/records/:recordId", updateExistingRecord);
router.delete("/:layout/records/:recordId", deleteExistingRecord);

export default router;
