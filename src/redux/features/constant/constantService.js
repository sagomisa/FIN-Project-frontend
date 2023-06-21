import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/constants/`;

// Get all constants
const getAllConstants = async () => {
  const response = await axios.get(API_URL + "getConstants");
  return response.data;
};

// Get constant by key
const getConstantByKey = async (key) => {
  const response = await axios.get(API_URL + "getConstantByKey/" + key);
  return response.data;
};

const updateConstantValue = async (key, value) => {
  console.log(`key>>>>>>${key}`);
  console.log(`value>>>>>>${value}`);
  const response = await axios.put(API_URL + "updateConstantValue", {
    key,
    value,
  });
  return response;
};

const constantService = {
  getAllConstants,
  getConstantByKey,
  updateConstantValue,
};

export default constantService;
