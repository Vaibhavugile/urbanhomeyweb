import React from "react";
import {
  MdSearch,
  MdRefresh,
  MdFilterList,
  MdFileDownload,
  MdAdd,
} from "react-icons/md";

import "./TableToolbar.css";

function TableToolbar({
  title,
  total = 0,
  search = "",
  onSearch,
  onRefresh,
  onFilter,
  onExport,
  onAdd,
  addLabel = "Add",
}) {
  return (
    <div className="table-toolbar">

      <div className="toolbar-left">

        <div>

          <h2>{title}</h2>

          <span>{total} Records</span>

        </div>

      </div>

      <div className="toolbar-center">

        <div className="toolbar-search">

          <MdSearch />

          <input
            value={search}
            onChange={(e) =>
              onSearch?.(e.target.value)
            }
            placeholder="Search..."
          />

        </div>

      </div>

      <div className="toolbar-right">

        <button
          className="toolbar-btn"
          onClick={onRefresh}
        >
          <MdRefresh />

          Refresh
        </button>

        <button
          className="toolbar-btn"
          onClick={onFilter}
        >
          <MdFilterList />

          Filters
        </button>

        <button
          className="toolbar-btn"
          onClick={onExport}
        >
          <MdFileDownload />

          Export
        </button>

        <button
          className="toolbar-add"
          onClick={onAdd}
        >
          <MdAdd />

          {addLabel}
        </button>

      </div>

    </div>
  );
}

export default TableToolbar;