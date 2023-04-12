import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { AdminOnlyLink } from "../protect/hiddenLink";
import { useMediaQuery } from "@mui/material";

export default function ScrollableTabsButtonForce() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mediumViewport = useMediaQuery("(min-width:768px)");

  return (
    <Box
      sx={{
        width: `${({ mediumViewport }) => (mediumViewport ? "100%" : "20%")}`,
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        orientation={mediumViewport ? "vertical" : "horizontal"}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Deposit" component={Link} to={"/deposit"} />
        <Tab label="Loan" component={Link} to={"/loan"} />
        <Tab label="Loan History" component={Link} to={"/applications"} />
        <Tab label="Gallery" component={Link} to={"/gallery"} />
        <Tab label="Teams" component={Link} to={"/teams"} />
        <Tab label="Events & Discussion" component={Link} to={"/events"} />
        <Tab label="Our Investments" component={Link} to={"/our-investments"} />
        <AdminOnlyLink>
          <Tab label="Users" component={Link} to={"/users"} />
        </AdminOnlyLink>
        <Tab label="Profile" component={Link} to={"/profile"} />
        <Tab label="Change Password" component={Link} to={"/changePassword"} />
      </Tabs>
    </Box>
  );
}
