import { useState, useEffect, useMemo } from "react";
import MainLayout from "../layouts/MainLayout";
import Table from "../common/Table";
import { useGet } from "../../hooks/useGet";
import type { ArchiveResponse } from "../../consts/types";
import { showToast } from '../../utils/showToastHandler';

const ArchivePage = () => {
  const [paginationQueryParams, setPaginationQueryParams] = useState<string>("");
  const {loading, data, error, getData} = useGet<ArchiveResponse>({
    url: `/requests/?${paginationQueryParams}`, headers: {Authorization: `Token ${import.meta.env.VITE_API_KEY}` },
  });
  const enhancedResults = useMemo(() => {
    return data?.results.map(item => ({
      ...item,
      filetype: item.filename.split('.').pop()?.toLowerCase() ?? 'unknown',
    })) ?? [];
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [paginationQueryParams]);
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
              <div className="flex justify-between mt-4">
                <button
                  disabled={!data.previous}
                  className="px-4 py-1.5 rounded bg-gray-100 disabled:opacity-50"
                  onClick={() => setPaginationQueryParams(data.previous ?? "")}
                >
                  صفحه قبل
                </button>

                <button
                  disabled={!data.next}
                  className="px-4 py-1.5 rounded bg-gray-100 disabled:opacity-50"
                  onClick={() => setPaginationQueryParams(data.next ?? "")}
                >
                  صفحه بعد
                </button>
              </div>
            </>
          : <></>
        }
      </MainLayout.Main>

    </MainLayout>
  )
}

export default ArchivePage;