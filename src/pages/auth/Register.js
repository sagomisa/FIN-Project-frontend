import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, RESET } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [upperCase, setUpperCase] = useState(false);
  const [num, setNum] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [pwLength, setPwLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    //Check Lowercase and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }

    // Check For Numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }

    // Check For Special char
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }

    // Check For Password length
    if (password.length > 5) {
      setPwLength(true);
    } else {
      setPwLength(false);
    }
  }, [password]);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Password do not match");
    }

    const userData = {
      name,
      email,
      password,
    };
    console.log(userData);
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/dashboard");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <form onSubmit={registerUser} className={styles.form}>
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
              Create an account
            </Typography>

            <TextField
              name="name"
              variant="outlined"
              value={name}
              onChange={handleInputChange}
              type="text"
              required
              placeholder="Name"
              margin="normal"
              sx={{ width: "100%" }}
            />
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
            <PasswordInput
              name="password2"
              value={password2}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field");
                return false;
              }}
            />

            <Card cardClass={styles.group}>
              <ul className="form-list">
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(upperCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(specialChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(pwLength)}
                    &nbsp; Al least 6 Characters
                  </span>
                </li>
              </ul>
            </Card>

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
              Register
            </Button>
          </Box>
        </form>
      </Card>
    </div>
  );
};

export default Register;
