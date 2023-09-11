import { useState } from "react";
import { useSelector } from "react-redux";

import Modal from "../../UI/Modal";
import classes from "./EmployeeFormModal.module.css";

import TextField from "@mui/material/TextField";
import CustomButton from "../../UI/CustomButton";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import validator from "validator";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const EmployeeFormModal = React.forwardRef((props, ref) => {
  const cafes = useSelector((state) => state.cafes.data);
  const [cafeId, setCafeId] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const {
    employeeNameRef,
    emailAddressRef,
    phoneNumberRef,
    genderMaleRef,
    genderFemaleRef,
    genderOtherRef,
    cafeRef,
    defaultGenderRef,
  } = ref;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmailChange = (event) => {
    const val = event.target.value;

    if (validator.isEmail(val)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const validatePhone = (e) => {
    const val = e.target.value;

    if (
      validator.isMobilePhone(val) &&
      val.trim().length === 8 &&
      (val.trim()[0] == 9 || val.trim()[0] == 8)
    ) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }
  };

  const cafesMenu = cafes.map((c) => (
    <MenuItem
      value={c.id}
      selected={cafeRef.current === c.id ? "selected" : false}
    >
      {c.name}
    </MenuItem>
  ));

  const handleChange = (event) => {
    setCafeId(event.target.value);
  };

  return (
    <Modal onClose={props.close} header={props.header}>
      <form
        className={classes.form}
        onSubmit={(e) => props.formSubmitHandler(e)}
      >
        <div>
          <TextField
            id="name"
            label="Employee Name"
            inputRef={employeeNameRef}
            defaultValue={employeeNameRef.current}
            placeholder="Employee Name"
            size="small"
            required={true}
          />
        </div>
        <div>
          <TextField
            id="emailAddress"
            onChange={(e) => handleEmailChange(e)}
            label="Email Address"
            inputRef={emailAddressRef}
            defaultValue={emailAddressRef.current}
            error={!isEmailValid}
            placeholder="Email Address"
            size="small"
            required={true}
          />
        </div>
        <div>
          <TextField
            id="phoneNumber"
            label="Phone Number"
            inputRef={phoneNumberRef}
            defaultValue={phoneNumberRef.current}
            placeholder="Phone Number"
            size="small"
            required={true}
            onChange={(e) => validatePhone(e)}
            error={!isPhoneValid}
            helperText="Phone number should starts with 8 or 9, and have 8 digits"
          />
        </div>

        <div>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            label="Gender"
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={
              defaultGenderRef && defaultGenderRef?.current
                ? defaultGenderRef.current
                : "Female"
            }
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
              inputRef={genderFemaleRef}
            />
            <FormControlLabel
              value="Male"
              control={<Radio />}
              label="Male"
              inputRef={genderMaleRef}
            />
            {/* <FormControlLabel
              value="Other"
              control={<Radio />}
              label="Other"
              inputRef={genderOtherRef}
            /> */}
          </RadioGroup>

          <FormLabel
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Select Cafe
          </FormLabel>
          {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {cafesMenu}
          </Menu> */}

          <Select
            label="Cafe"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cafeId ? cafeId : cafeRef.current}
            inputRef={cafeRef}
            onChange={handleChange}
          >
            {cafesMenu}
          </Select>
        </div>

        <div className="textRight">
          <CustomButton type="button" onClick={props.close} cancel={true}>
            Cancel
          </CustomButton>
          <CustomButton disabled={!isEmailValid || !isPhoneValid} type="submit">
            Confirm
          </CustomButton>
        </div>
      </form>
    </Modal>
  );
});

export default EmployeeFormModal;
