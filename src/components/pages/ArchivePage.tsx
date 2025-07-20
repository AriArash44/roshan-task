import { useState, useEffect, useMemo } from "react";
import MainLayout from "../layouts/MainLayout";
import Table from "../common/Table";
import { useGet } from "../../hooks/useGet";
import type { ArchiveResponse } from "../../consts/types";
import { showToast } from '../../utils/showToastHandler';
import { emitHourMili, gregorianToJalali } from "../../utils/formatTime";
import Pagination from "../common/Pagination";

const ArchivePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryParams = useMemo(() => {
    const offset = (currentPage - 1) * 8;
    return `limit=8&offset=${offset}`;
  }, [currentPage]);
  const {loading, data, error, getData} = useGet<ArchiveResponse>({
    url: `/requests/?${queryParams}`, headers: {Authorization: `Token ${import.meta.env.VITE_API_KEY}` },
  });
  const enhancedResults = useMemo(() => {
    return data?.results.map(item => {
      const filetype = item.filename?.split('.').pop()?.toLowerCase() ?? 'unknown';
      const transformedDuration = emitHourMili(item.duration);
      const transformedProcessed = gregorianToJalali(item.processed.split("T")[0]);
      return {
        ...item,
        filetype,
        duration: transformedDuration,
        processed: transformedProcessed ?? item.processed,
      };
    }) ?? [];
  }, [data]);

  useEffect(() => {
    getData();
  }, [queryParams]);
  useEffect(() => {
    if(error){
      showToast(error);
    }
  }, [error]);

  return (
    <MainLayout>
      <MainLayout.Header>
        <></>
      </MainLayout.Header>
      <MainLayout.Main>
        { loading ? 
          <div className="loader"></div> 
          : data ? 
            <>
              <Table data={enhancedResults} columns={[
                {
                  "accessor": "filename",
                  "title": "نام فایل"
                },
                {
                  "accessor": "processed",
                  "title": "تاریخ بارگذاری"
                },
                {
                  "accessor": "filetype",
                  "title": "نوع فایل"
                },
                {
                  "accessor": "duration",
                  "title": "مدت زمان"
                },
              ]} hasIcon hasDownload hasWord hasCopy hasDelete/>
              <Pagination totalCount={data.count} limit={8} currentPage={currentPage} onPageChange={setCurrentPage}/>
            </>
          : <></>
        }
      </MainLayout.Main>

    </MainLayout>
  )
}

export default ArchivePage;