import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import depositService from "./depositService";

const initialState = {
  status: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const getStatus = createAsyncThunk(
  "depositStatus/getStatus",
  async () => {
    const response = await depositService.depositStatus();
    return response;
  }
);

export const sendDepositReminderUser = createAsyncThunk(
  "depositStatus/sendDepositReminderUser",
  async (depositData) => {
    const response = await depositService.sendDepositReminderUser(depositData);
    return response;
  }
);

export const sendDepositReminderAllUser = createAsyncThunk(
    "depositStatus/sendDepositReminderAllUser",
    async () => {
      const response = await depositService.sendDepositReminderAllUser();
      return response;
    }
  );

const depositStatusSlice = createSlice({
  name: "depositStatus",
  initialState,
  reducers: {
    resetDepositStatusState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [getStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [getStatus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.status = action.payload;
    },
    [getStatus.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      toast.error("Error fetching deposits");
    },
    [sendDepositReminderUser.pending]: (state) => {
    },
    [sendDepositReminderUser.fulfilled]: (state, action) => {
    toast.success("Deposit Reminder Sent!")
    },
    [sendDepositReminderUser.rejected]: (state) => {
      toast.error("Error sending Reminder");
    },
    [sendDepositReminderAllUser.pending]: (state) => {
    },
    [sendDepositReminderAllUser.fulfilled]: (state, action) => {
    toast.success("Deposit Reminder Sent to all unpaid users!")
    },
    [sendDepositReminderAllUser.rejected]: (state) => {
      toast.error("Error sending Reminder");
    },
  },
});

export default depositStatusSlice.reducer;

export const { resetDepositStatusState } = depositStatusSlice.actions;
