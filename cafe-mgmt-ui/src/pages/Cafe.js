import { Fragment } from "react";
import PageTitleBox from "../components/UI/PageTitleBox";
import AvailableCafes from "../components/Cafe/AvailableCafes";

const Cafe = () => {
  return (
    <Fragment>
      <PageTitleBox>
        <h2>Cafes</h2>
      </PageTitleBox>
      <AvailableCafes />
    </Fragment>
  );
};

export default Cafe;
