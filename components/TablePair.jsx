import React from 'react';

const TablePair = ({ headers, rows }) => {
  return (
    <div className="mb-12">
      {/* English Table */}
      <div className="mb-2 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={`en-th-${index}`} className="border-b-2 border-gray-300 py-3 px-4 text-gray-900 font-sans font-semibold bg-gray-50">
                  {header.en}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`en-row-${rowIndex}`} className="border-b border-gray-200 hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={`en-cell-${rowIndex}-${cellIndex}`} className="py-3 px-4 text-gray-900 font-serif text-sm leading-relaxed">
                    {cell.en}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Indonesian Translation Table (Optional) */}
      {headers[0]?.id && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={`id-th-${index}`} className="border-b-2 border-blue-200 py-3 px-4 text-gray-800 font-sans font-semibold bg-blue-100/50">
                    {header.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`id-row-${rowIndex}`} className="border-b border-blue-100 hover:bg-blue-100/30">
                  {row.map((cell, cellIndex) => (
                    <td key={`id-cell-${rowIndex}-${cellIndex}`} className="py-3 px-4 text-gray-700 font-serif text-sm leading-relaxed">
                      {cell.id}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablePair;
