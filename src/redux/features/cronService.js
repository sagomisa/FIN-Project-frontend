// I have imported axios from different loaction due to inbuilt issue in vercel from cron jobs
// reference: https://github.com/vercel/vercel/issues/9769#issuecomment-1513744322
import axios from 'axios/dist/node/axios.cjs'


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/deposits/`;

// Initiate monthly Deposit
const createMonthlyDeposit = async () => {
  const response = await axios.post(
    API_URL + "createMonthlyDeposit"
  );

  return response.data.message;
};

const cronService = {
  createMonthlyDeposit
};

export default cronService;
