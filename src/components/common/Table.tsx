import type { TableProps } from "../../consts/types";
import { getWhiteIconPath, getIconPath } from "../../utils/getIconPath";

const persianNumberColumns = ["duration", "processed"];

const Table = <T extends Record<string, any>>({data, columns, hasIcon = false, hasDownload = false, 
  hasWord = false, hasCopy = false, hasDelete = false}: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {hasIcon && <th></th>}
          {columns.map((col, idx) => (
            <th key={idx}>{col.title}</th>
          ))}
          {hasDownload && <th></th>}
          {hasWord && <th></th>}
          {hasCopy && <th></th>}
          {hasDelete && <th></th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {hasIcon && (<td><img src={getWhiteIconPath(row["icon"])} alt={row["icon"]} 
            className={row["icon"] === "mic" ? "bg-green" : row["icon"] === "upload" ? "bg-blue" : "bg-red"}/> </td>)}
            {columns.map((col, colIdx) => {
              const raw = (row as any)[col.accessor];
              return (
                <td key={colIdx}>
                  <span className={ persianNumberColumns.includes(col.accessor.toString()) ? "fanum" : "" }>
                    {col.render ? col.render(raw, row) : String(raw)}
                  </span>
                </td>
              );
            })}
            {hasDownload && (<td><button><img src={getIconPath("download")} alt="download" /></button></td>)}
            {hasWord && (<td><button><img src={getIconPath("word")} alt="word" /></button></td>)}
            {hasCopy && (<td><button><img src={getIconPath("copy")} alt="copy" /></button></td>)}
            {hasDelete && (<td><button><img src={getIconPath("del")} alt="del" /></button></td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
