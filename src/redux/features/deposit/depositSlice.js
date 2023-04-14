import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import depositService from "./depositService";

const initialState = {
  deposits: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const getAllDeposits = createAsyncThunk(
  "deposit/getAllDeposits",
  async () => {
    const response = await depositService.getAllDeposits();
    return response;
  }
);

export const createDeposit = createAsyncThunk(
  "deposit/createDeposit",
  async (depositData) => {
    const response = await depositService.createDeposit(depositData);
    return response;
  }
);

// Update Deposit
export const updateDeposit = createAsyncThunk(
  "deposit/updateDeposit",
  async (depositData, thunkAPI) => {
    try {
      return await depositService.updateDeposit(depositData);
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

// upgrade Deposit status
export const upgradeDepositStatus = createAsyncThunk(
  "deposit/upgradeDepositStatus",
  async (userData, thunkAPI) => {
    try {
      return await depositService.upgradeDepositStatus(userData);
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

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    resetDepositState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getAllDeposits.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllDeposits.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.deposits = action.payload;
    },
    [getAllDeposits.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error fetching deposits");
    },
    [createDeposit.pending]: (state) => {
      state.isLoading = true;
    },
    [createDeposit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.deposits.push(action.payload);
      toast.success("deposit created successfully");
    },
    [createDeposit.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error creating deposit");
    },
    // Update User
    [updateDeposit.pending]: (state) => {
      state.isLoading = true;
    },
    [updateDeposit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
      console.log(action.payload);
      toast.success("Deposit Updated");
    },
    [updateDeposit.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
      console.log(action.payload);
    },
    [upgradeDepositStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [upgradeDepositStatus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action.payload);
    },
    [upgradeDepositStatus.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    },
  },
});

export default depositSlice.reducer;

export const { resetDepositState } = depositSlice.actions;
