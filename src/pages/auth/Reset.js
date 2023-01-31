import React, { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { Box, Button, Typography } from "@mui/material";
import PasswordInput from "../../components/passwordInput/PasswordInput";

const initialState = {
  password: "",
  password2: "",
};
const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;

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
