import { useState, useEffect, useMemo } from "react";
import MainLayout from "../layouts/MainLayout";
import Table from "../common/Table";
import { useGet } from "../../hooks/useGet";
import type { ArchiveResponse } from "../../consts/types";
import { showToast } from '../../utils/showToastHandler';
import { emitHourMili, gregorianToJalali } from "../../utils/formatTime";
import Pagination from "../common/Pagination";
import { validFormats } from "../../consts/mediaFormats";

const ArchivePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const queryParams = useMemo(() => {
    const offset = (currentPage - 1) * 10;
    return `limit=10&offset=${offset}&page=${currentPage}`;
  }, [currentPage]);
  const {loading, data, error, getData} = useGet<ArchiveResponse>({
    url: `/requests/?${queryParams}`, headers: {Authorization: `Token ${import.meta.env.VITE_API_KEY}` },
  });
  const enhancedResults = useMemo(() => {
    return data?.results.map(item => {
      const typeCandidate = item.filename?.split('.').pop()?.toLowerCase() || "unknown";
      const filetype = validFormats.includes(typeCandidate) ? typeCandidate : "unknown";
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
  }, [queryParams, refreshFlag]);
  useEffect(() => {
    if(error){
      showToast(error);
    }
  }, [error]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_USE_MOCK === "true" ? import.meta.env.VITE_MOCK_URL : import.meta.env.VITE_BASE_URL}/requests/${id}/`,
        {
          method: 'DELETE',
          headers: { Authorization: `Token ${import.meta.env.VITE_API_KEY}` },
        }
      );
      if (!res.ok) throw new Error('error during deleting!');
      showToast('successfully deleted!');
      setRefreshFlag(flag => !flag);
    } catch (err: any) {
      showToast(err.message);
    }
  };

  return (
    <MainLayout>
      <MainLayout.Header>
        {data && <h2 className="w-250 px-3 text-right text-green">آرشیو من</h2>}
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
              ]} hasIcon hasDownload hasWord hasCopy hasDelete hasOpen onDelete={handleDelete}/>
              <div className="flex justify-center mt-5">
                <Pagination totalCount={data.count} limit={10} currentPage={currentPage} onPageChange={setCurrentPage}/>
              </div>
            </>
          : <></>
        }
      </MainLayout.Main>
    </MainLayout>
  )
}

export default ArchivePage;