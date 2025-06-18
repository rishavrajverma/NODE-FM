import axios from "axios";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const { FM_HOST, FM_DATABASE, FM_USER, FM_PASS } = process.env;

const baseURL = `${FM_HOST}/fmi/data/v1/databases/${FM_DATABASE}`;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const getToken = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/sessions`,
      {},
      {
        auth: {
          username: FM_USER!,
          password: FM_PASS!,
        },
        httpsAgent,
      }
    );

    console.log("Token Response:", response.data);
    return response.data.response.token;
  } catch (error: any) {
    console.error("Failed to get token");
    //error respose from filemaker :
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else {
      console.error("Request setup error:", error.message);
    }

    console.debug("Axios config (trimmed):", {
      method: error.config?.method,
      url: error.config?.url,
      headers: error.config?.headers,
      data: error.config?.data,
    });

    throw new Error("Unable to connect to FileMaker server.");
  }
};

export const getCustomers = async () => {
  try {
    const token = await getToken();

    const response = await axios.get(`${baseURL}/layouts/Customer/records`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent,
    });

    return response.data.response.data;
  } catch (error: any) {
    console.error(
      " Error fetching customers:",
      error?.response?.data || error.message
    );
    throw new Error("Failed to fetch customers");
  }
};
