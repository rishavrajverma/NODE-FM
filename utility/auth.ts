import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseURL = `${process.env.FM_HOST}/fmi/data/v1/databases/${process.env.FM_DATABASE}`;

export const getToken = async () => {
  const response = await axios.post(
    `${baseURL}/sessions`,
    {},
    {
      auth: {
        username: process.env.FM_USER!,
        password: process.env.FM_PASS!,
      },
    }
  );
  return response.data.response.token;
};

export const getCustomers = async () => {
  const token = await getToken();
  const response = await axios.get(`${baseURL}/layouts/Customer/records`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
