import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import SelectComponent from "../selectComponent/SelectComponent";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <div id="contact">
      <div className="contact-card"> 
        <form>
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
            <Typography className="h1" variant="h1">
              Get in touch with us!
            </Typography>
            <Typography className="p" variant="p">
              For security purposes, do not include any personal information
              such as account numbers, addresses, or social insurance numbers in
              your message.
            </Typography>
            <div className="flex-inputs">
              <TextField
                id="input"
                name="name"
                variant="standard"
                type="name"
                placeholder="Name"
                margin="normal"
                sx={{ width: "100%" }}
              />
              <TextField
                id="input"
                name="email"
                variant="standard"
                type="email"
                placeholder="Email"
                margin="normal"
                sx={{ width: "100%" }}
              />
            </div>
            <div className="flex-inputs">
              <TextField
                id="input"
                name="message"
                variant="standard"
                type="text"
                placeholder="Your Message"
                margin="normal"
                multiline
                maxRows={4}
                sx={{ width: "100%" }}
              />
              <SelectComponent />
            </div>
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#f48634",
                borderColor: "#f48634",
                width: "30%",
                padding: "1%",
                fontSize: "14px",
                margin: "2% 0",
              }}
              variant="contained"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
