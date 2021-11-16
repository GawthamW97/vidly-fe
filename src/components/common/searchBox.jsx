import React from "react";

const Searchbox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      id="query"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Searchbox;
