import { useMemo, useState } from "react";
import type { TableProps, TranscriptionTabsProps, Segment } from "../../consts/types";
import { getWhiteIconPath, getIconPath } from "../../utils/getIconPath";
import { persianNumberColumns, wideColumns } from "../../consts/tableColumns";
import TabsWithMenu from "../common/TabsWithMenu";
import AudioPlayer from "../common/AudioPlayer";
import RowsTable from '../common/Rows';
import type { FC } from "react";
import { handleCopy } from "../../utils/copyText";
import { showToast } from "../../utils/showToastHandler";
import { handleDownload } from "../../utils/downloadUrl";
import handleWord from "../../utils/createWord";

const TranscriptionTabs: FC<TranscriptionTabsProps> = ({ theme, audioSrc, segments }) => {
  const fullText = useMemo(() => segments.map((s) => s.text).join(" "),[segments]);
  return (
    <TabsWithMenu defaultIndex={0} hasDownload={false} hasCopy={false} hasTryAgain={false} theme={theme}>
      <TabsWithMenu.Tab title="متن ساده" icon="text">
        <p className="font-light">{fullText}</p>
        <div className="absolute bottom-0 w-[94%] mb-5">
          <AudioPlayer src={audioSrc} theme={theme} />
        </div>
      </TabsWithMenu.Tab>
      <TabsWithMenu.Tab title="متن زمان‌بندی شده" icon="time">
        <RowsTable texts={segments} />
        <div className="absolute bottom-0 w-[94%] mb-5 pt-2 bg-neutral-white">
          <AudioPlayer src={audioSrc} theme={theme} />
        </div>
      </TabsWithMenu.Tab>
    </TabsWithMenu>
  );
};

const Table = <T extends Record<string, any>>({data, columns, hasIcon = false, hasDownload = false,
  hasWord = false, hasCopy = false, hasDelete = false, hasOpen = false}: TableProps<T>) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
        {data.map((row, rowIdx) => (
          <div className={`rounded-xl ${ openIndex === rowIdx ? (row["icon"] === "mic" ? "border border-green-500" : 
          row["icon"] === "upload" ? "border border-blue-500" : "border border-red-500") : "" }`}>
            <div key={rowIdx} role="row" className="flex items-center p-3 rounded-lg hover:shadow-md"
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
                  <button className="cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    {e.stopPropagation(); handleDownload(row["url"]);}
                  }><img src={getIconPath("download")} alt="download" /></button>
                </div>)}
                {hasWord && (<div role="cell" className="flex-1">
                  <button className="cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  {e.stopPropagation(); handleWord(row["segments"].map((s: Segment) => s.text).join(" "))}}><img src={getIconPath("word")} alt="word" /></button>
                </div>)}
                {hasCopy && (<div role="cell" className="flex-1">
                  <button className="cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    {e.stopPropagation(); handleCopy(row["segments"].map((s: Segment) => s.text).join(" ")); showToast("text copied!")}
                  }><img src={getIconPath("copy")} alt="copy" /></button>
                </div>)}
                {hasDelete && (<div role="cell" className="flex-1">
                  <button className="cursor-pointer"><img src={getIconPath("del")} alt="delete" /></button>
                </div>)}
              </div>
            </div>
            {openIndex === rowIdx && (
              <div className="relative h-100 mr-10">
                <TranscriptionTabs audioSrc={row["url"]} segments={row["segments"]}
                  theme={row["icon"] === "mic" ? "green" : row["icon"] === "upload" ? "blue" : "red"} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
