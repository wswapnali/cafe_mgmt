import Modal from "../../UI/Modal";
import classes from "./CafeFormModal.module.css";

import TextField from "@mui/material/TextField";
import CustomButton from "../../UI/CustomButton";
import React from "react";

const CafeFormModal = React.forwardRef((props, ref) => {
  const { cafeNameInput, descriptionInput, locationInput } = ref;

  return (
    <Modal onClose={props.close} header={props.header}>
      <form
        encType="multipart/form"
        className={classes.form}
        onSubmit={(e) => props.formSubmitHandler(e)}
      >
        <div>
          <TextField
            id="name"
            label="Cafe Name"
            inputRef={cafeNameInput}
            defaultValue={cafeNameInput.current}
            placeholder="Cafe Name"
            size="small"
            required={true}
          />
        </div>
        <div>
          <TextField
            id="description"
            label="Description"
            inputRef={descriptionInput}
            defaultValue={descriptionInput.current}
            placeholder="Description"
            size="small"
            required={true}
          />
        </div>
        <div>
          <TextField
            id="location"
            label="Location"
            inputRef={locationInput}
            defaultValue={locationInput.current}
            placeholder="Location"
            size="small"
            required={true}
          />
        </div>
        {/* <div>
          <Button
            variant="contained"
            aria-label="upload picture"
            component="label"
          >
            Upload Logo
            <input hidden accept="image/*" type="file" ref={logoInput} />
          </Button>
        </div> */}

        <div className="textRight">
          <CustomButton type="button" onClick={props.close} cancel={true}>
            Cancel
          </CustomButton>
          <CustomButton type="submit">Confirm</CustomButton>
        </div>
      </form>
    </Modal>
  );
});

export default CafeFormModal;
