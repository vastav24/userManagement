import React from "react";

// src/components/Table.jsx

const Table = ({
  data = [],
  headers = [],
  rowRenderer,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          {headers?.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.length > 0 ? (
          data?.map((item, index) => (
            <tr
              key={item.id || index}
              className="hover:bg-gray-50 border-t border-gray-200"
            >
              {rowRenderer(item, onView, onEdit, onDelete)}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={headers?.length}
              className="px-6 py-6 text-center text-gray-500"
            >
              No more data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
