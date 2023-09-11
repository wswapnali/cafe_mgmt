import Header from "../components/Layout/Header";
import Card from "../components/UI/Card";
import { Fragment } from "react";
import PageTitleBox from "../components/UI/PageTitleBox";

const ErrorPage = () => {
  return (
    <Fragment>
      <Header />
      <PageTitleBox>
        <h2>Error occured</h2>
      </PageTitleBox>
      <section className="sectionBox">
        <Card>
          <p className="textCenter">Page not found!</p>
        </Card>
      </section>
    </Fragment>
  );
};

export default ErrorPage;
