import React, { Fragment } from "react";

const ListGroup = ({
  items,
  currentGenre,
  onGenreChange,
  textProperty,
  valueProperty,
}) => {
  return (
    <Fragment>
      <ul className="list-group">
        {items.map((item) => {
          return (
            <li
              key={item[valueProperty]}
              className={
                item[valueProperty] === currentGenre
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => onGenreChange(item[valueProperty])}
              style={{ cursor: "pointer" }}
            >
              {item[textProperty]}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
