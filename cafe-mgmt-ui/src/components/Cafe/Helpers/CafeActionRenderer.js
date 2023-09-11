import CustomButton from "../../UI/CustomButton";
const CafeActionRenderer = (props) => {
  const editButtonClicked = () => {
    props.editCafeHandler(props.data);
  };

  const deleteButtonClicked = () => {
    props.deleteCafeHandler(props.data.id);
  };

  return (
    <span>
      <CustomButton onClick={() => editButtonClicked()}>Edit</CustomButton>
      <CustomButton onClick={() => deleteButtonClicked()}>Delete</CustomButton>
    </span>
  );
};

export default CafeActionRenderer;
