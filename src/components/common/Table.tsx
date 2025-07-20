import type { TableProps } from "../../consts/types";
import { getWhiteIconPath, getIconPath } from "../../utils/getIconPath";
import { persianNumberColumns, wideColumns } from "../../consts/tableColumns";

const Table = <T extends Record<string, any>>({data, columns, hasIcon = false, hasDownload = false,
  hasWord = false, hasCopy = false, hasDelete = false,}: TableProps<T>) => {
  return (
    <div role="table" className="w-250">
      <div role="rowgroup" className="hidden md:block">
        <div role="row" className="flex mb-2 p-2 rounded-t-lg">
          {hasIcon && <div role="columnheader" className="w-1/12" />}
          {columns.map((col, idx) => (
            <div key={idx} role="columnheader" className={`px-2
            ${wideColumns.includes(col.accessor.toString()) ? "w-2/5" : "flex-1 text-center"}`}>
              {col.title}
            </div>
          ))}
          <div className="flex gap-1 w-[12%]">
            {hasDownload && <div role="columnheader"/>}
            {hasWord && <div role="columnheader"/>}
            {hasCopy && <div role="columnheader"/>}
            {hasDelete && <div role="columnheader"/>}
          </div>
        </div>
      </div>
      <div role="rowgroup" className="flex flex-col">
        {data.map((row, rowIdx) => (
          <div key={rowIdx} role="row" className="flex items-center p-3 rounded-lg hover:shadow-md">
            {hasIcon && (
              <div role="cell" className="w-1/12 flex justify-center">
                <img src={getWhiteIconPath(row["icon"])} alt={row["icon"]} className={`p-2 w-8 h-8 rounded-full 
                ${ row["icon"] === "mic" ? "bg-green-500" : row["icon"] === "upload" ? "bg-blue-500" : "bg-red-500" }`} />
              </div>
            )}
            {columns.map((col, colIdx) => {
              const raw = (row as any)[col.accessor];
              return (
                <div key={colIdx} role="cell" className={`${wideColumns.includes(col.accessor.toString()) ? "w-2/5 text-right" : "flex-1 text-center"}
                px-2 truncate ${persianNumberColumns.includes(col.accessor.toString()) ? "fanum" : ""}`} dir="ltr">
                  {col.render ? col.render(raw, row) : String(raw)}
                </div>
              );
            })}
            <div className="flex gap-1 w-[12%] items-center">
              {hasDownload && (<div role="cell" className="flex-1">
                <button className="cursor-pointer"><img src={getIconPath("download")} alt="download" /></button>
              </div>)}
              {hasWord && (<div role="cell" className="flex-1">
                <button className="cursor-pointer"><img src={getIconPath("word")} alt="word" /></button>
              </div>)}
              {hasCopy && (<div role="cell" className="flex-1">
                <button className="cursor-pointer"><img src={getIconPath("copy")} alt="copy" /></button>
              </div>)}
              {hasDelete && (<div role="cell" className="flex-1">
                <button className="cursor-pointer"><img src={getIconPath("del")} alt="delete" /></button>
              </div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
