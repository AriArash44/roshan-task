import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Table from "../common/Table";
import { useGet } from "../../hooks/useGet";
import type { ArchiveResponse } from "../../consts/types";
import { showToast } from '../../utils/showToastHandler';
import { getTitleFromAccessor } from "../../utils/mapAccessorToTitle"; 

const ArchivePage = () => {
  const [paginationQueryParams, setPaginationQueryParams] = useState<string>("");
  const {loading, data, error, getData} = useGet<ArchiveResponse>({
    url: `/requests/?${paginationQueryParams}`, headers: {Authorization: `Token ${import.meta.env.VITE_API_KEY}` },
  });

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
              <Table data={data.results} columns={Object.keys(data.results).map((col) => {
                return {
                  "accessor": col,
                  "title": getTitleFromAccessor(col)
                }
              })} hasIcon hasDownload hasWord hasCopy hasDelete/>
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