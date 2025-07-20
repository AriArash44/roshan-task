import type { PaginationProps } from "../../consts/types";
import type { FC } from "react";
import { useMemo } from "react";

const Pagination: FC<PaginationProps> = ({totalCount, limit, currentPage, onPageChange}) => {
  const pagesNumber = useMemo(() => Math.ceil(totalCount / limit), [totalCount, limit]);
  return(
    <div className="flex">
      <button className="fanum cursor-pointer p-2" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>{"<"}</button>
      {Array.from({ length: pagesNumber }, (_, i) => i + 1).map((index) => {
        return (
          <button key={index} className="fanum cursor-pointer p-2" onClick={() => onPageChange(index)}>{index}</button>
        )
      })}
      <button className="fanum cursor-pointer p-2"onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= pagesNumber}>{">"}</button>
    </div>
  )
}

export default Pagination;