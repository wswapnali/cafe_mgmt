import { Link } from "react-router-dom";
const EmployeesRedirectionRenderer = (props) => {
  const employeesCount = props.data.employees ? props.data.employees : 0;
  return (
    employeesCount && (
      <Link to={`/employees/${props.data.id}`}>{employeesCount}</Link>
    )
  );
};

export default EmployeesRedirectionRenderer;
