import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../redux/features/auth/authService";
import { toast } from "react-toastify";
import { login, RESET } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/dashboard");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <>
      <ScrollToTop />
      <div className={`container ${styles.auth}`}>
        {isLoading && <Loader />}
        <Card>
          <form onSubmit={loginUser} className={styles.form}>
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
                Let’s sign you in
              </Typography>

              <TextField
                name="email"
                variant="outlined"
                value={email}
                onChange={handleInputChange}
                type="email"
                placeholder="Email"
                margin="normal"
                sx={{ width: "100%" }}
              />
              <PasswordInput
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
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
                Login
              </Button>
              <Link to="/forgot">Forgot Password?</Link>
              <span className={styles.register}></span>
            </Box>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
