import React, { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, RESET } from "../../redux/features/auth/authSlice";
import { validateEmail } from "../../redux/features/auth/authService";
import Loader from "../../components/loader/Loader";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter an email");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };
    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <form onSubmit={forgot} className={styles.form}>
          <Box
            className="formBox"
            marginLeft="auto"
            marginRight="auto"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h1"
              sx={{ fontSize: "3rem", fontWeight: "bold" }}
            >
              Forgot Password?
            </Typography>
            <Typography sx={{ fontSize: "1.8rem", color: "black" }}>
              Enter your email
            </Typography>

            <TextField
              name="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              margin="normal"
              sx={{ width: "100%" }}
            />

            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#f48634",
                borderColor: "#f48634",
                width: "100%",
                padding: "2%",
                fontSize: "14px",
                margin: "2% 0",
              }}
              variant="contained"
              size="large"
              type="submit"
            >
              Get reset email
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
};

export default Forgot;
