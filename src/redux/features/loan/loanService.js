import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/loans/`;

// Get all loans
const getAllLoans = async () => {
  const response = await axios.get(API_URL + "getAllLoans");
  return response.data;
};

// Create a loan
const createLoan = async (loanData) => {
  const response = await axios.post(API_URL + "createLoan", loanData);
  return response.data;
};

const loanService = {
  getAllLoans,
  createLoan,
};

export default loanService;
