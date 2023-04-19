import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { Box, Button, Typography } from "@mui/material";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  checkChar,
  checkNumbers,
  checkUcaseLcase,
} from "../../redux/features/auth/authService";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";

const initialState = {
  password: "",
  password2: "",
};
const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();
  console.log(resetToken);

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("Password do not match");
    }
    if (password.length < 6) {
      return toast.error("Password must be at lest 6 characters");
    }
    if (!checkUcaseLcase(password)) {
      return toast.error(
        "Please add at least one uppercase and lowercase letter"
      );
    }
    if (!checkNumbers(password)) {
      return toast.error("Please add at least one number");
    }
    if (!checkChar(password)) {
      return toast.error("Please add at least one character");
    }

    const userData = {
      password,
    };
    await dispatch(resetPassword({ userData, resetToken }));
  };

  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <form onSubmit={reset} className={styles.form}>
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
              Reset Password
            </Typography>

            <PasswordInput
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <PasswordInput
              name="password2"
              value={password2}
              onChange={handleInputChange}
              placeholder="Confirm Password"
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
              Reset
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
};

export default Reset;
