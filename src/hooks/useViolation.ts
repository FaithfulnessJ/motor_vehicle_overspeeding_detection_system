import { useState, useEffect } from "react";
import SpeedVoilationServices from "../utils/services/SpeedVoilationServices";
import _ from "lodash";

export const useViolation = (searchValue?: string) => {
  const [violations, setViolations] = useState<any[]>([]);
  const [filteredViolations, setFilteredViolations] = useState<any[]>([]);
  const [stateLoading, setStateLoading] = useState<boolean>(true);

  const handleSearch = (arr: any[], cond: any) => {
    const newArr = _.filter(arr, (obj) => {
      if (cond) {
        return (
          obj.vehicleNumberPlate
            ?.toLowerCase()
            ?.includes(cond?.toLowerCase()) ||
          obj.area?.toLowerCase()?.includes(cond?.toLowerCase())
        );
      }
    });

    if (cond) return newArr;
    else return violations;
  };

  useEffect(() => {
    const fetchAllViolations = async () => {
      await SpeedVoilationServices.fetchAllViolation().then((response) => {
        setViolations(response);
        setFilteredViolations(response);
        setStateLoading(false);
      });
    };
    fetchAllViolations();
  }, []);

  useEffect(() => {
    setFilteredViolations(handleSearch(violations, searchValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [violations, searchValue]);

  return { stateLoading, filteredViolations };
};

export const useMyViolation = (userId: string, searchValue: string) => {
  const [violations, setViolations] = useState<any[]>([]);
  const [filteredViolations, setFilteredViolations] = useState<any[]>([]);
  const [stateLoading, setStateLoading] = useState<boolean>(true);

  const handleSearch = (arr: any[], cond: any) => {
    const newArr = _.filter(arr, (obj) => {
      if (cond) {
        return (
          obj.vehicleNumberPlate
            ?.toLowerCase()
            ?.includes(cond?.toLowerCase()) ||
          obj.area?.toLowerCase()?.includes(cond?.toLowerCase())
        );
      }
    });

    if (cond) return newArr;
    else return violations;
  };

  useEffect(() => {
    const fetchMyViolations = async () => {
      await SpeedVoilationServices.fetchAllViolation().then((response) => {
        setViolations(response.filter((res: any) => res?.user === userId));
        setFilteredViolations(
          response.filter((res: any) => res?.user === userId)
        );
        setStateLoading(false);
      });
    };
    fetchMyViolations();
  }, []);

  useEffect(() => {
    setFilteredViolations(handleSearch(violations, searchValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [violations, searchValue]);

  return { stateLoading, filteredViolations };
};