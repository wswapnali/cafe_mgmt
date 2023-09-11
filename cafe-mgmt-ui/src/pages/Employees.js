import { Fragment } from "react";
import PageTitleBox from "../components/UI/PageTitleBox";
import AvailableEmployees from "../components/Employee/AvailableEmployees";

const Employees = () => {
  return (
    <Fragment>
      <PageTitleBox>
        <h2>Employees</h2>
      </PageTitleBox>
      <AvailableEmployees />
    </Fragment>
  );
};

export default Employees;
