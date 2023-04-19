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
  console.log(`loanData>>>>>${JSON.stringify(loanData)}`);
  const response = await axios.post(API_URL + "createLoan", loanData);
  return response.data;
};

// Get update loan
const updateLoan = async (loanData) => {
  const response = await axios.patch(API_URL + "updateLoan", loanData);
  return response.data;
};

//Delete Loan
const deleteLoan = async (id) => {
  console.log(`id>>>>>>>>>${id}`);
  const response = await axios.delete(API_URL + "deleteLoan/" + id);

  return response.data.message;
};

// Get update status
const changeLoanStatus = async (loanData) => {
  const response = await axios.patch(API_URL + "changeLoanStatus", loanData);
  console.log(`response>>>>${response.data}`);
  return response.data;
};

const loanService = {
  getAllLoans,
  createLoan,
  deleteLoan,
  updateLoan,
  changeLoanStatus,
};

export default loanService;
