import { useMemo, useState } from "react";
import type { TranscriptionTabsProps } from "../../consts/types";
import { emitHourMili, timeToSec } from "../../utils/formatTime";
import TabsWithMenu from "./TabsWithMenu";
import AudioPlayer from "./AudioPlayer";
import RowsTable from './Rows';
import { handleDownload } from '../../utils/downloadUrl';
import { handleCopy } from '../../utils/copyText';
import { showToast } from "../../utils/showToastHandler";

const TranscriptionTabs: React.FC<TranscriptionTabsProps> = ({ theme, audioSrc, segments,
    tryAgain, hasTryAgain = false, hasDownload = false, hasCopy = false, width = "full" }) => {
  const fullText = useMemo(() => segments.map((s) => s.text).join(" "),[segments]);
  const [currentTime, setCurrentTime] = useState(0);
  const activeIndex = useMemo(() => {
    return segments.findIndex(
      segment => currentTime >= timeToSec(emitHourMili(segment.start)) && currentTime <= timeToSec(emitHourMili(segment.end))
    );
  }, [currentTime, segments]);

  return (
    <TabsWithMenu defaultIndex={0} hasDownload={hasDownload} hasCopy={hasCopy} hasTryAgain={hasTryAgain} onTryAgain={() => {tryAgain!()}} theme={theme}
    onDownload={() => {handleDownload(audioSrc)}} onCopy={() => {handleCopy(fullText); showToast("text copied!")}} headerClass={`w-${width}`} contentClass={hasCopy ? '' : 'pl-10'}>
      <TabsWithMenu.Tab title="متن ساده" icon="text">
        <p className="font-light">
          {segments.map((segment, segmentIdx) => (
            <span key={segmentIdx} className={segmentIdx === activeIndex ? `text-${theme} font-bold` : ""}>
              {segment.text}{" "}
            </span>
          ))}
        </p>
        <div className={`absolute bottom-0 w-${width} mb-5`}>
          <AudioPlayer src={audioSrc} theme={theme} onTimeUpd={setCurrentTime} />
        </div>
      </TabsWithMenu.Tab>
      <TabsWithMenu.Tab title="متن زمان‌بندی شده" icon="time">
        <RowsTable texts={segments} activeIndex={activeIndex} theme={theme} />
        <div className={`absolute bottom-0 w-${width} pb-5 rounded-b-xl pt-2 bg-neutral-white`}>
          <AudioPlayer src={audioSrc} theme={theme} onTimeUpd={setCurrentTime} />
        </div>
      </TabsWithMenu.Tab>
    </TabsWithMenu>
  );
};

export default TranscriptionTabs;
