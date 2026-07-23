import React from "react";

import "./DataTable.css";

function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found.",
}) {
  if (loading) {
    return (
      <div className="table-card">
        <div className="table-loading">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">

      <div className="table-wrapper">

        <table className="data-table">

          <thead>

            <tr>

              {columns.map((column) => (
                <th key={column.key}>
                  {column.title}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="empty-cell"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row.id ?? index}>

                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>
                  ))}

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DataTable;