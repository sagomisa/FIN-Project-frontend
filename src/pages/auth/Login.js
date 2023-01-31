import React, { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import ScrollToTop from "../../components/scrollToTop/ScrollToTop";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = () => {};
  const loginUser = () => {};
  return (
    <>
      <ScrollToTop />
      <div className={`container ${styles.auth}`}>
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
              {/* <TextField
              name="password"
              variant="outlined"
              value={password}
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
              margin="normal"
              sx={{ width: "100%" }}
            /> */}

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
