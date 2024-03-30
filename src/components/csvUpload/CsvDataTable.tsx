import React from 'react';

interface CSVProps {
    data: [];
}

function CsvTableHeader({ colNames }) {
  return (
    <thead className='sticky top-0 truncate font-sans bg-white'>
      <tr>
        {colNames?.map((title) => (
          <th
            key={title}
            scope='col'
            className='truncate border p-2 text-left text-xs font-semibold uppercase'
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function CsvTableRow({ rowData, rowKey }) {
  return (
    <tr key={rowKey}>
      {rowData?.map((el, idx) => (
        <td
          // eslint-disable-next-line
          key={idx}
          className='w-fit max-w-0 truncate border border-cool-grey-200 text-left text-sm'
        >
          {el}
        </td>
      ))}
    </tr>
  );
}

export default function CsvDataTable({ data }: CSVProps) {
  return (
    <div className='bg-white'>
      <table className='w-full overflow-y-auto'>
        {data?.data.length > 0 && (
          <>
            <CsvTableHeader colNames={Object.keys(data?.data[0])} />
            <tbody>
              {data.data.map((el, idx) => (
                // eslint-disable-next-line
                <CsvTableRow
                  rowData={Object.values(el)}
                  rowKey={idx}
                  // eslint-disable-next-line
                  key={idx}
                />
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}
