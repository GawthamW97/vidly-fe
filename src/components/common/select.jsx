import React from "react";

const Select = ({ name, label, error, list, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name} {...rest}>
        <option value="" />
        {list.map((item) => {
          return (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
