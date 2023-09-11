import classes from "./PageTitleBox.module.css";

const PageTitleBox = (props) => {
  return <section className={classes.summary}>{props.children}</section>;
};

export default PageTitleBox;
