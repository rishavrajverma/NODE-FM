import axios from "axios";
import https from "https";
import dotenv from "dotenv";

dotenv.config();

const { FM_HOST, FM_DATABASE, FM_USER, FM_PASS } = process.env;

export const baseURL = `${FM_HOST}/fmi/data/v1/databases/${FM_DATABASE}`;
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

let tokenCache: string | null = null;

const requestNewToken = async (): Promise<string> => {
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
  const token: string = response.data.response.token;
  tokenCache = token;
  console.log("New token generated!");
  return tokenCache;
};

export const getToken = async (): Promise<string> => {
  if (tokenCache) return tokenCache;
  return await requestNewToken();
};

export const axiosInstance = async () => {
  const token = await getToken();
  return axios.create({
    baseURL,
    httpsAgent,
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const invalidateToken = () => {
  tokenCache = null;
};
