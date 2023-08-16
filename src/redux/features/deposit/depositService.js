import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/deposits/`;

// Get all Deposits
const getAllDeposits = async () => {
  const response = await axios.get(API_URL + "getAllDeposits");
  return response.data;
};

// Create a Deposit
const createDeposit = async (depositData) => {
  const response = await axios.post(API_URL + "createDeposit", depositData);
  return response.data;
};

//update Deposit
const updateDeposit = async (depositData) => {
  const response = await axios.patch(API_URL + "updateDeposit", depositData);
  return response.data;
};

// Upgrade Deposit
const upgradeDepositStatus = async (depositData) => {
  const response = await axios.patch(
    API_URL + "upgradeDepositStatus",
    depositData
  );

  return response.data.message;
};

// Initiate monthly Deposit
const createMonthlyDeposit = async () => {
  const response = await axios.post(
    API_URL + "createMonthlyDeposit"
  );

  return response.data.message;
};

const depositService = {
  getAllDeposits,
  createDeposit,
  updateDeposit,
  upgradeDepositStatus,
  createMonthlyDeposit
};

export default depositService;
