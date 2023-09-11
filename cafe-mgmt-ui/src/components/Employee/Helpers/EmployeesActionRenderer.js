import CustomButton from "../../UI/CustomButton";

const EmployeesActionRenderer = (props) => {
  const editButtonClicked = () => {
    props.editEmployeeHandler(props.data);
  };

  const deleteButtonClicked = () => {
    props.deleteEmployeeHandler(props.data.id);
  };

  return (
    <span>
      <CustomButton onClick={() => editButtonClicked()}>Edit</CustomButton>
      <CustomButton onClick={() => deleteButtonClicked()}>Delete</CustomButton>
    </span>
  );
};

export default EmployeesActionRenderer;
