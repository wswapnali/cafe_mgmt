import React from "react";

const LogoRenderer = (props) => {
  return props.data.logoUrl ? (
    <img
      src={props.data.logoUrl.props.src}
      alt={props.data.logoUrl.props.alt}
    />
  ) : // <img src={"data:image/jpg;base-64,"+data} alt='image'></img>}
  null;
  // return (
  //   <img
  //     src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
  // AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
  //     9TXL0Y4OHwAAAABJRU5ErkJggg=="
  //     alt="Red dot"
  //   />
  // );
};

export default LogoRenderer;
