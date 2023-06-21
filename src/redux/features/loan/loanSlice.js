import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import loanService from "./loanService";

const initialState = {
  loans: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  userLoan: null
};

export const getAllLoans = createAsyncThunk("loan/getAllLoans", async () => {
  const response = await loanService.getAllLoans();
  return response;
});

export const createLoan = createAsyncThunk(
  "loan/createLoan",
  async (loanData, thunkAPI) => {
    try{
      return await loanService.createLoan(loanData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Loan
export const updateLoan = createAsyncThunk(
  "loan/updateLoan",
  async (loanData, thunkAPI) => {
    try {
      return await loanService.updateLoan(loanData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete a loan
export const deleteLoan = createAsyncThunk("loan/deleteLoan", async (id) => {
  const response = await loanService.deleteLoan(id);
  return response;
});

// change Loan status
export const changeLoanStatus = createAsyncThunk(
  "loan/changeLoanStatus",
  async (loanData, thunkAPI) => {
    try {
      console.log(`loandata2>>${loanData}`);
      return await loanService.changeLoanStatus(loanData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get current user loan
export const getUserLoan = createAsyncThunk("loan/getUserLoan", async () => {
  const response = await loanService.getUserLoan();
  return response;
});

// cancel user loan
export const cancelLoan = createAsyncThunk("loan/cancelLoan", async (id) => {
  const response = await loanService.cancelLoan(id);
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
      state.userLoan = action.payload;
      toast.success("Loan created successfully");
    },
    [createLoan.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    },
    // Update loan
    [updateLoan.pending]: (state) => {
      state.isLoading = true;
    },
    [updateLoan.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(action.payload);
      toast.success("Profile Updated");
    },
    [updateLoan.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
      console.log(action.payload);
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
    // change loan status

    [changeLoanStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [changeLoanStatus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      console.log(`action.payload>>>>${JSON.stringify(action.payload)}`);
      toast.success(action.payload.message);
    },
    [changeLoanStatus.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    },
    [getUserLoan.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserLoan.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userLoan = action.payload;
    },
    [getUserLoan.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error fetching user loan");
    },
    [cancelLoan.pending]: (state) => {
      state.isLoading = true;
    },
    [cancelLoan.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userLoan = action.payload;
      toast.success("Loan cancelled successfully")
    },
    [cancelLoan.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error canceling the loan");
    },
  },
});

export default loanSlice.reducer;

export const { resetLoanState } = loanSlice.actions;
