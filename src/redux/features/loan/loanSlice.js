import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import loanService from "./loanService";

const initialState = {
  loans: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const getAllLoans = createAsyncThunk("loan/getAllLoans", async () => {
  const response = await loanService.getAllLoans();
  return response;
});

export const createLoan = createAsyncThunk(
  "loan/createLoan",
  async (loanData) => {
    const response = await loanService.createLoan(loanData);
    return response;
  }
);

//Delete a loan
export const deleteLoan = createAsyncThunk("loan/deleteLoan", async (id) => {
  console.log(`id2>>>>>${id}`);
  const response = await loanService.deleteLoan(id);
  return response;
});

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    resetLoanState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getAllLoans.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllLoans.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.loans = action.payload;
    },
    [getAllLoans.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error fetching loans");
    },
    [createLoan.pending]: (state) => {
      state.isLoading = true;
    },
    [createLoan.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.loans.push(action.payload);
      toast.success("Loan created successfully");
    },
    [createLoan.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error creating loan");
    },
    //Delete Loan
    [deleteLoan.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteLoan.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    },
    [deleteLoan.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error deleting loan");
    },
  },
});

export default loanSlice.reducer;

export const { resetLoanState } = loanSlice.actions;
