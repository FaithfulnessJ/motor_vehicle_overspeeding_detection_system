import { useState, useEffect, useCallback } from "react";

const calculateTotalPages = (data: any[], rowsPerPage: number) => {
  const count = Math.ceil(data?.length / rowsPerPage);
  return count || 0;
};

const sliceData = (data: any[], page: number, rowsPerPage: number) => {
  if (data) return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  else return undefined;
};

export const useTable = (data: any[], page: number, rowsPerPage: number) => {
  const [tableCount, setTableCount] = useState<number>(0);
  const [slice, setSlice] = useState<any[]>([]);

  function sortByDateCreatedAscending(violationData: any[]): any[] {
    return violationData.sort(
      (a, b) => parseInt(a.dateTime) - parseInt(b.dateTime)
    );
  }

  function sortByDateCreatedDescending(violationData: any[]): any[] {
    return violationData.sort(
      (a, b) => parseInt(b.dateTime) - parseInt(a.dateTime)
    );
  }

  const calculateTotalPagesCallback = useCallback(() => {
    const count = calculateTotalPages(data, rowsPerPage);
    setTableCount(count);
  }, [data, rowsPerPage]);

  const sliceDataCallback = useCallback(() => {
    const slice = sliceData(data, page, rowsPerPage);
    slice && setSlice([...slice]);
  }, [data, page, rowsPerPage]);

  useEffect(() => {
    calculateTotalPagesCallback();
    sliceDataCallback();
  }, [calculateTotalPagesCallback, sliceDataCallback]);

  return {
    slice,
    count: tableCount,
    sortByDateCreatedAscending,
    sortByDateCreatedDescending,
  };
};
