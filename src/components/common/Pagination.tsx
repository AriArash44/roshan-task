import type { PaginationProps } from "../../consts/types";
import type { FC } from "react";
import { useMemo } from "react";
import { getIconPath } from "../../utils/getIconPath";

const Pagination: FC<PaginationProps> = ({totalCount, limit, currentPage, onPageChange}) => {
  const pagesNumber = useMemo(() => Math.ceil(totalCount / limit), [totalCount, limit]);
  return(
    <div className="flex">
      <button className={`fanum cursor-pointer p-2 ${currentPage <= 1 ? "hidden" : ""}`} onClick={() => onPageChange(currentPage - 1)}><img src={getIconPath("right-arrow")} alt="prev" /></button>
      {Array.from({ length: pagesNumber }, (_, i) => i + 1).map((index) => {
        return (
          <button key={index} className={`fanum cursor-pointer m-1 w-6 h-6 rounded-full  ${index === currentPage ? "bg-green text-white" : "font-light"}`} onClick={() => onPageChange(index)}>{index}</button>
        )
      })}
      <button className={`fanum cursor-pointer p-2 ${currentPage >= pagesNumber ? "hidden" : ""}`} onClick={() => onPageChange(currentPage + 1)}><img src={getIconPath("left-arrow")} alt="next" /></button>
    </div>
  )
}

export default Pagination;