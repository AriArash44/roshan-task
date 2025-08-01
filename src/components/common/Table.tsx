import { useMemo, useState, useEffect } from "react";
import type { TableProps, Segment } from "../../consts/types";
import { getWhiteIconPath, getIconPath, getGreenIconPath } from "../../utils/getIconPath";
import { persianNumberColumns, wideColumns } from "../../consts/tableColumns";
import { handleCopy } from "../../utils/copyText";
import { showToast } from "../../utils/showToastHandler";
import { handleDownload } from "../../utils/downloadUrl";
import handleWord from "../../utils/createWord";
import Tooltip from "./Tooltip";
import getFileSize from "../../utils/getFileSize";
import TranscriptionTabs from "./TranscriptionTab";

function pickIcon(type: string, hovered: { id: number; type: string } | null, rowId: number) {
  const isHovering = hovered?.id === rowId && hovered?.type === type;
  if(isHovering){
    if(type === "del") {
      return getWhiteIconPath("del");
    }
    else {
      return getGreenIconPath(type);
    }
  }
  else{
    return getIconPath(type);
  }
}

const Table = <T extends Record<string, any>>({data, columns, hasIcon = false, hasDownload = false,
  hasWord = false, hasCopy = false, hasDelete = false, hasOpen = false, onDelete}: TableProps<T>) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [size, setSize] = useState<string>("نامعلوم");
  const [url, setUrl] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<{ id: number, type: string } | null>(null)
  useEffect(() => {
    if(!url) return;
    getFileSize(url).then((res) => {
      setSize(res ? `${res} مگابایت` : "نامعلوم");
    });
  }, [url]);
  const icons = ['mic', 'upload', 'chain'];
  const decoratedData = useMemo(() => {
    return data.map((row) => {
      const stableIcon = row["icon"] ?? icons[Math.floor(Math.random() * icons.length)];
      return { ...row, stableIcon };
    });
  }, [data]);
  return (
    <div role="table" className="w-250">
      <div role="rowgroup" className="hidden md:block">
        <div role="row" className="flex mb-2 p-2 rounded-t-lg">
          {hasIcon && <div role="columnheader" className="w-[6%]" />}
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
        {decoratedData.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className={`rounded-xl ${ openIndex === rowIdx ? (row.stableIcon === "mic" ? "border border-green-500" : 
            row.stableIcon === "upload" ? "border border-blue-500" : "border border-red-500") : "" }`}>
              <div role="row" className="flex items-center p-3 rounded-lg hover:shadow-md"
              onClick={() => {
                if(hasOpen) {
                  if(openIndex === rowIdx) {
                    setOpenIndex(null);
                  } else {
                    setOpenIndex(rowIdx);
                  } 
                }
              }}>
                {hasIcon && (
                  <div role="cell" className="w-[6%] flex">
                    <img src={getWhiteIconPath(row.stableIcon)} alt={row["icon"] ?? "randomIcon"} className={`p-2 w-8 h-8 rounded-full
                    ${row.stableIcon === "mic" ? "bg-green-500" : row.stableIcon === "upload" ? "bg-blue-500" : "bg-red-500" }`} />
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
                  {hasDownload && (<Tooltip text={size}><div role="cell" className="flex-1 flex ml-1" onMouseEnter={() => setUrl(row["url"] as string)} onMouseLeave={() => setUrl(null)}>
                    <button className="cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      {e.stopPropagation(); handleDownload(row["url"]);} 
                      } onMouseEnter={() => setHoveredIcon({ id: rowIdx, type: "download" })} onMouseLeave={() => setHoveredIcon(null)
                    }><img src={pickIcon("download", hoveredIcon, rowIdx)} alt="download" /></button>
                  </div></Tooltip>)}
                  {hasWord && (<div role="cell" className="flex-1 flex justify-center">
                    <button className="cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      {e.stopPropagation(); handleWord(row["segments"].map((s: Segment) => s.text).join(" "))}
                      } onMouseEnter={() => setHoveredIcon({ id: rowIdx, type: "word" })} onMouseLeave={() => setHoveredIcon(null)
                    }><img src={pickIcon("word", hoveredIcon, rowIdx)} alt="word" /></button>
                  </div>)}
                  {hasCopy && (<div role="cell" className="flex-1 flex justify-center">
                    <button className="cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      {e.stopPropagation(); handleCopy(row["segments"].map((s: Segment) => s.text).join(" ")); showToast("text copied!")}
                      } onMouseEnter={() => setHoveredIcon({ id: rowIdx, type: "copy" })} onMouseLeave={() => setHoveredIcon(null)
                    }><img src={pickIcon("copy", hoveredIcon, rowIdx)} alt="copy" /></button>
                  </div>)}
                  {hasDelete && (<div role="cell" className="flex-1 flex justify-center">
                    <button className="cursor-pointer hover:bg-red p-1 rounded-full w-6 h-6" onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                      {e.stopPropagation(); if(onDelete) onDelete(row["id"])}
                      } onMouseEnter={() => setHoveredIcon({ id: rowIdx, type: "del" })} onMouseLeave={() => setHoveredIcon(null)
                    }><img src={pickIcon("del", hoveredIcon, rowIdx)} alt="delete" className="m-auto"/></button>
                  </div>)}
                </div>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === rowIdx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="relative h-100 mr-10">
                  <TranscriptionTabs audioSrc={row["url"]} segments={row["segments"]}
                    theme={row.stableIcon === "mic" ? "green" : row.stableIcon === "upload" ? "blue" : "red"} />
                </div>
              </div>
            </div>
          )}
        )}
      </div>
    </div>
  );
};

export default Table;
