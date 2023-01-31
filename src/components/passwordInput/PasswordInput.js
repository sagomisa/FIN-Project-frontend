import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./PasswordInput.scss";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const PasswordInput = ({ placeholder, name, value, onChange, onPaste }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="password" style={{ width: "100%" }}>
      <TextField
        name={name}
        variant="outlined"
        value={value}
        required
        onChange={onChange}
        onPaste={onPaste}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        margin="normal"
        sx={{ width: "100%" }}
      />
      <div className="icon" onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
