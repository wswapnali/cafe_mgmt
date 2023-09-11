import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Fragment } from "react";
const CustomButton = (props) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#8a2b06"),
    fontSize: props?.size === "small" ? "10px" : "inherit",
    backgroundColor: "#8a2b06",
    border: "1px solid #8a2b06",
    margin: "5px",
    marginTop: "0px",
    "&:hover": {
      backgroundColor: theme.palette.getContrastText("#8a2b06"),
      color: "#8a2b06",
    },
  }));

  const CancelColorButton = styled(Button)(({ theme }) => ({
    color: "#8a2b06",
    fontSize: props.size === "small" ? "10px" : "inherit",
    backgroundColor: theme.palette.getContrastText("#8a2b06"),
    border: "1px solid #8a2b06",
    margin: "5px",
    marginTop: "0px",
    "&:hover": {
      backgroundColor: "#8a2b06",
      color: theme.palette.getContrastText("#8a2b06"),
    },
  }));

  const cancelButton = (
    <CancelColorButton
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.children}
    </CancelColorButton>
  );

  const defaultlButton = (
    <ColorButton
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.children}
    </ColorButton>
  );

  return <Fragment>{props.cancel ? cancelButton : defaultlButton}</Fragment>;
};

export default CustomButton;
