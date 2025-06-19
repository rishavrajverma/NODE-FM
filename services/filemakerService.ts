import { axiosInstance, invalidateToken } from "../utility/FilemakerClient";

const retryRequest = async (callback: () => Promise<any>) => {
  try {
    return await callback();
  } catch (err: any) {
    const code = err?.response?.data?.messages?.[0]?.code;
    if (code === "952") {
      console.warn("Token expired. Retrying with a new token...");
      invalidateToken();
      return await callback();
    }

    const message = err?.response?.data?.messages?.[0]?.message || err.message;
    throw new Error(`FileMaker API Error: ${message}`);
  }
};

// Fetch all records
export const fetchRecords = async (layout: string) =>
  retryRequest(async () => {
    const client = await axiosInstance();
    const res = await client.get(`/layouts/${layout}/records`);
    return res.data.response.data;
  });

// Fetch single record
export const fetchRecordById = async (layout: string, id: string) =>
  retryRequest(async () => {
    const client = await axiosInstance();
    const res = await client.get(`/layouts/${layout}/records/${id}`);
    return res.data.response.data;
  });

// Create new record
export const createRecord = async (layout: string, fieldData: any) =>
  retryRequest(async () => {
    const client = await axiosInstance();
    const res = await client.post(`/layouts/${layout}/records`, { fieldData });
    return res.data.response;
  });

// Update record
export const updateRecord = async (
  layout: string,
  recordId: string,
  fieldData: any
) =>
  retryRequest(async () => {
    const client = await axiosInstance();
    const res = await client.patch(`/layouts/${layout}/records/${recordId}`, {
      fieldData,
    });
    return res.data.response;
  });

// Delete record
export const deleteRecord = async (layout: string, recordId: string) =>
  retryRequest(async () => {
    const client = await axiosInstance();
    const res = await client.delete(`/layouts/${layout}/records/${recordId}`);
    return res.data.response;
  });
