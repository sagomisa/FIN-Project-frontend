import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import "./SelectComponent.css";

import FormControl from "@mui/material/FormControl";

const SelectComponent = () => {
  const [platform, setPlatform] = useState("");

  const handleChange = (event) => {
    setPlatform(event.target.value);
  };

  return (
    <div className="sort">
      <Box sx={{ padding: "2% 0" }}>
        <FormControl fullWidth>
          <Select
            id="menuItem"
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            variant="standard"
            value={platform}
            label="Platform"
            onChange={handleChange}
          >
            <MenuItem id="menuItem" value="">
              <em
                style={{
                  fontSize: "16px",
                  color: "#a6a6a6",
                  fontStyle: "normal",
                }}
              >
                Where did you hear about us?
              </em>
            </MenuItem>
            <MenuItem id="menuItem" value={10} style={{ fontSize: "16px" }}>
              Google
            </MenuItem>
            <MenuItem id="menuItem" value={20} style={{ fontSize: "16px" }}>
              LinkedIn
            </MenuItem>
            <MenuItem id="menuItem" value={30} style={{ fontSize: "16px" }}>
              Facebook
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectComponent;
