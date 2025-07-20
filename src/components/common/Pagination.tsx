import type { FC } from "react"
import { useMemo } from "react"
import { getIconPath } from "../../utils/getIconPath"
import type { PaginationProps } from "../../consts/types"

const Pagination: FC<PaginationProps> = ({ totalCount, limit, currentPage, onPageChange }) => {
  const pagesNumber = useMemo(() => Math.ceil(totalCount / limit), [totalCount, limit]);
  const paginationRange = useMemo<(number | string)[]>(() => {
    const siblingCount = 1;
    const boundaryCount = 1;
    const totalPageNumbers = siblingCount * 2 + boundaryCount * 2 + 3;
    if (pagesNumber <= 1) return []
    if (pagesNumber <= totalPageNumbers) {
      return Array.from({ length: pagesNumber }, (_, i) => i + 1);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pagesNumber - boundaryCount - 1);
    const range: (number | string)[] = []
    for (let i = 1; i <= boundaryCount; i++) {
      range.push(i)
    }
    if (leftSiblingIndex > boundaryCount + 2) {
      range.push("...")
    } else {
      for (let i = boundaryCount + 1; i < leftSiblingIndex; i++) {
        range.push(i)
      }
    }
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      range.push(i)
    }
    if (rightSiblingIndex < pagesNumber - boundaryCount - 1) {
      range.push("...")
    } else {
      for (let i = rightSiblingIndex + 1; i <= pagesNumber - boundaryCount; i++) {
        range.push(i)
      }
    }
    for (let i = pagesNumber - boundaryCount + 1; i <= pagesNumber; i++) {
      range.push(i)
    }
    return range
  }, [pagesNumber, currentPage])
  if (paginationRange.length <= 1) return null
  return (
    <div className="flex items-center">
      <button className={`fanum cursor-pointer p-2 ${currentPage <= 1 ? "hidden" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src={getIconPath("right-arrow")} alt="prev" />
      </button>
      {paginationRange.map((item, idx) =>
        item === "..." ? (
          <span key={`ellipsis-${idx}`} className="fanum m-1">
            …
          </span>
        ) : (
          <button key={item} className={`fanum cursor-pointer m-1 w-6 h-6 rounded-full ${
              item === currentPage ? "bg-green text-white" : "font-light"
            }`} onClick={() => onPageChange(item as number)}
          >{item}</button>
        )
      )}
      <button className={`fanum cursor-pointer p-2 ${currentPage >= pagesNumber ? "hidden" : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src={getIconPath("left-arrow")} alt="next" />
      </button>
    </div>
  )
}

export default Pagination
