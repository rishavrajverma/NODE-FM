import { Request, Response } from "express";
import {
  fetchRecords,
  fetchRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../services/filemakerService";

// Get all records
export const getLayoutRecords = async (req: Request, res: Response) => {
  const { layout } = req.params;

  try {
    const data = await fetchRecords(layout);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single record
export const getRecordById = async (req: Request, res: Response) => {
  const { layout, recordId } = req.params;

  try {
    const data = await fetchRecordById(layout, recordId);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new record
export const createNewRecord = async (req: Request, res: Response) => {
  const { layout } = req.params;
  const fieldData = req.body;

  try {
    const result = await createRecord(layout, fieldData);
    res.status(201).json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update record
export const updateExistingRecord = async (req: Request, res: Response) => {
  const { layout, recordId } = req.params;
  const fieldData = req.body;

  try {
    const result = await updateRecord(layout, recordId, fieldData);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete record
export const deleteExistingRecord = async (req: Request, res: Response) => {
  const { layout, recordId } = req.params;

  try {
    const result = await deleteRecord(layout, recordId);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get details by find query method
export const getRecordsBy = async (req: Request, res: Response) => {
  const { layout } = req.params;

  try {
    const data = await fetchRecords(layout);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};