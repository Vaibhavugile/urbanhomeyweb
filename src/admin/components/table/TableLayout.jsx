import React from "react";

import TableToolbar from "./TableToolbar";
import DataTable from "./DataTable";

function TableLayout({
  title,
  total,
  columns,
  data,
  loading,

  search,
  onSearch,

  onRefresh,
  onFilter,
  onExport,
  onAdd,

  addLabel,

  emptyMessage,
}) {
  return (
    <>
      <TableToolbar
        title={title}
        total={total}
        search={search}
        onSearch={onSearch}
        onRefresh={onRefresh}
        onFilter={onFilter}
        onExport={onExport}
        onAdd={onAdd}
        addLabel={addLabel}
      />

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage={emptyMessage}
      />
    </>
  );
}

export default TableLayout;