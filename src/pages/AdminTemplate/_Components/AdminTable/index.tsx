type TableRow = Record<string, string | number>;

type TAdminTable = {
  tableHeaders: string[];
  rows: TableRow[];
};

export default function AdminTable({ tableHeaders, rows }: TAdminTable) {
  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            {tableHeaders.map((header) => (
              <th key={header} className="py-3 capitalize">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {tableHeaders.map((header) => (
                <td key={header} className="py-3">
                  {String(item[header] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}