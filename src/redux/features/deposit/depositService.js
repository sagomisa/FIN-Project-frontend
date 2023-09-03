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

// Get status
const depositStatus = async () => {
  const response = await axios.get(API_URL + "depositStatus");
  return response.data;
};

// send deposit reminder for user
const sendDepositReminderUser = async (depositData) => {
  const response = await axios.post(API_URL + "depositReminderUser", depositData);
  return response.data;
};

// send deposit reminder for alluser
const sendDepositReminderAllUser = async () => {
  const response = await axios.post(API_URL+"depositReminderAllUser");
  return response.data;
};

const depositService = {
  getAllDeposits,
  createDeposit,
  updateDeposit,
  upgradeDepositStatus,
  // createMonthlyDeposit
  depositStatus,
  sendDepositReminderUser,
  sendDepositReminderAllUser
};

export default depositService;
