import React, { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");

  const handleInputChange = () => {};
  const loginUser = () => {};
  return (
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
              Enter Access Code
            </Typography>

            <TextField
              name="loginCode"
              variant="outlined"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
              type="text"
              placeholder="Access Code"
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
              Proceed to login
            </Button>
            <p>Check your email for login access code</p>
            <p className="v-link --color-secondary">
              <b>Resend Code</b>
            </p>
          </Box>
        </form>
      </Card>
    </div>
  );
};

export default LoginWithCode;
