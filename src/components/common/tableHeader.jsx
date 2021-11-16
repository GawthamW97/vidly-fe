import React, { Component, Fragment } from "react";

//column : array
//sortColumn : object
//onSort : function

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { path, order } = this.props.sortColumn;
    if (column.path !== path) return null;
    if (order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <Fragment>
        <thead>
          <tr>
            {this.props.columns.map((column) => {
              return (
                <th
                  className="clickable"
                  onClick={() => this.raiseSort(column.path)}
                  key={column.path || column.key}
                >
                  {column.label}
                  {this.renderSortIcon(column)}
                </th>
              );
            })}
          </tr>
        </thead>
      </Fragment>
    );
  }
}

export default TableHeader;
