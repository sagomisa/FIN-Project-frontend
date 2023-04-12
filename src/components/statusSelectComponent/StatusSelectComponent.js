import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function StatusSelectComponent() {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          id="menuItem"
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          variant="standard"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"Approve"}>Approved</MenuItem>
          <MenuItem value={"Rejected"}>Rejected</MenuItem>
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
