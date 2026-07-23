import React from "react";
import {
  MdVisibility,
  MdEdit,
  MdDelete,
} from "react-icons/md";

import "./TableActions.css";

function TableActions({
  row,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="table-actions">

      {/* View */}
      <button
        type="button"
        className="action-btn view"
        title="View User"
        disabled={!onView}
        onClick={() => onView?.(row)}
      >
        <MdVisibility />
      </button>

      {/* Edit */}
      <button
        type="button"
        className="action-btn edit"
        title="Edit User"
        disabled={!onEdit}
        onClick={() => onEdit?.(row)}
      >
        <MdEdit />
      </button>

      {/* Delete */}
      <button
        type="button"
        className="action-btn delete"
        title="Delete User"
        disabled={!onDelete}
        onClick={() => onDelete?.(row)}
      >
        <MdDelete />
      </button>

    </div>
  );
}

export default React.memo(TableActions);