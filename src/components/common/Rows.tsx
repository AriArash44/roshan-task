import type { FC } from "react";
import type { RowsProps } from "../../consts/types";
import { emitHourMili } from "../../utils/formatTime";

const RowsFlex: FC<RowsProps> = ({ texts }) => {
  return (
    <div>
      {texts.map(({ start, end, text }, idx) => (
        <div key={idx} className="flex justify-start items-center rounded-4xl odd:bg-neutral-white even:bg-neutral-400">
          <p className="p-4 fanum">{emitHourMili(end)}</p>
          <p className="p-4 fanum">{emitHourMili(start)}</p>
          <p className="p-4">{text}</p>
        </div>
      ))}
    </div>
  );
};

export default RowsFlex;
