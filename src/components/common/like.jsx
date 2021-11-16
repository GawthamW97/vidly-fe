import React, { Fragment } from "react";

const Like = ({ movie, like, onLike }) => {
  let classes = "fa fa-heart";
  if (!like) classes += "-o";
  return (
    <Fragment>
      <i
        className={classes}
        aria-hidden="true"
        onClick={() => onLike(movie)}
        style={{ cursor: "pointer" }}
      ></i>
    </Fragment>
  );
};

export default Like;
