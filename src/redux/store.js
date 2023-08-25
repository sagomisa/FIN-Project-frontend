import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import emailReducer from "../redux/features/email/emailSlice";
import filterReducer from "../redux/features/auth/filterSlice";
import loanReducer from "../redux/features/loan/loanSlice";
import eventReducer from "../redux/features/event/eventSlice";
import depositReducer from "../redux/features/deposit/depositSlice";
import blogReducer from "../redux/features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filter: filterReducer,
    loan: loanReducer,
    event: eventReducer,
    deposit: depositReducer,
    blog: blogReducer
  },
});
