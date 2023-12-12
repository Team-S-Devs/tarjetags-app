import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AccentButton = ({
  children,
  variant = "outlined",
  fullWidth,
  style,
  fontSize = 15,
  href,
}) => {
  const buttonStyle = {
    borderColor: "#9DD91A",
    color: "black",
    fontSize,
    ...style,
  };

  return (
    <Link
      to={href}
      style={{ color: "black", textDecoration: "none" }}
      target="_blank"
    >
      <Button style={buttonStyle} variant={variant} fullWidth={fullWidth}>
        {children}
      </Button>
    </Link>
  );
};

export default AccentButton;
