import type { ReactNode } from "react";

interface TableProps {
  data: Record<string, unknown>[];
}

function formatValue(value: unknown): ReactNode {
  if (value === null || value === undefined) {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Ja" : "Nej";
  }

  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
  ) {
    return new Date(value).toLocaleString("sv-SE");
  }

  return String(value);
}

function Table({ data }: TableProps) {
  if (data.length === 0) {
    return <div className="table-empty">Ingen data att visa.</div>;
  }

  const columns = Array.from(new Set(data.flatMap(Object.keys)));

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column}>{formatValue(row[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
