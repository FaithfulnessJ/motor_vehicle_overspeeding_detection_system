import { useState, useEffect, useMemo } from "react";
import SpeedVoilationServices from "../utils/services/SpeedVoilationServices";
import _ from "lodash";

// All vehicles violated
export const useViolation = () => {
  const [violations, setViolations] = useState<any[]>([]);
  const [stateLoading, setStateLoading] = useState<boolean>(true);

  const handleSearch = async (cond?: any) => {
    setStateLoading(true);
    if (cond) {
      await SpeedVoilationServices.violationSearch(cond).then((response) => {
        setViolations(response);
        setStateLoading(false);
      });
    } else {
      await SpeedVoilationServices.fetchAllViolatedVehicle().then(
        (response) => {
          setViolations(response);
          setStateLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    const fetchAllViolatedVehicle = async () => {
      await SpeedVoilationServices.fetchAllViolatedVehicle().then(
        (response) => {
          setViolations(response);
          setStateLoading(false);
        }
      );
    };
    fetchAllViolatedVehicle();
  }, []);

  return { stateLoading, violations, handleSearch };
};

// User violations
export const useMyViolation = (userId: string) => {
  const [violations, setViolations] = useState<any[]>([]);
  const [stateLoading, setStateLoading] = useState<boolean>(true);

  const handleSearch = async (cond?: any) => {
    setStateLoading(true);
    if (cond) {
      await SpeedVoilationServices.violationSearch(cond).then((response) => {
        setViolations(response.filter((res: any) => res?.user === userId));
        setStateLoading(false);
      });
    } else {
      await SpeedVoilationServices.fetchAllViolation().then((response) => {
        setViolations(response.filter((res: any) => res?.user === userId));
        setStateLoading(false);
      });
    }
  };

  useEffect(() => {
    const fetchMyViolations = async () => {
      await SpeedVoilationServices.fetchAllViolation().then((response) => {
        setViolations(response.filter((res: any) => res?.user === userId));
        setStateLoading(false);
      });
    };
    fetchMyViolations();
  }, []);

  return { stateLoading, violations, handleSearch };
};

// Specific vehile violation
export const useVehicleViolations = (
  vehicle: string,
  monthToFilter?: number
) => {
  const [violations, setViolations] = useState<any[]>([]);
  const [violatedAreas, setViolatedAreas] = useState<any[]>([]);
  const [violatedAreasCount, setViolatedAreasCount] = useState<any[]>([]);
  const [stateLoading, setStateLoading] = useState<boolean>(true);

  const handleSearch = async (cond?: any) => {
    setStateLoading(true);
    if (cond) {
      await SpeedVoilationServices.violationSearch(cond).then((response) => {
        setViolations(response);
        setStateLoading(false);
      });
    } else {
      await SpeedVoilationServices.fetchSpecificVehicleViolations(vehicle).then(
        (response) => {
          setViolations(response);
          setStateLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    const fetchVehicleViolation = async () => {
      const areasArray: any[] = [];
      const violationsArray: any[] = [];
      const areasArrayCount: any[] = [];
      let previousArea = "";

      await SpeedVoilationServices.fetchSpecificVehicleViolations(vehicle).then(
        (response) => {
          setStateLoading(false);

          for (const violation of response) {
            const date = new Date(violation["dateTime"]);
            const month = date.getMonth() +1;
            if (monthToFilter) {
              if (month === monthToFilter) {
                violationsArray.push(violation);
              }
            } else {
              violationsArray.push(violation);
            }
          }
          setViolations(violationsArray);
          

          response.sort(compareByArea);
          for (const violation of response) {
            const date = new Date(violation["dateTime"]);
            const month = date.getMonth() + 1;

            if (monthToFilter) {
              if (month === monthToFilter) {
                const area = violation["area"];
                if (area !== previousArea) {
                  areasArray.push(area);
                  areasArrayCount.push(1);
                  previousArea = area;
                } else {
                  const lastIndex = areasArrayCount.length - 1;
                  areasArrayCount[lastIndex] += 1;
                }
              }
            } else {
              const area = violation["area"];
              if (area !== previousArea) {
                areasArray.push(area);
                areasArrayCount.push(1);
                previousArea = area;
              } else {
                const lastIndex = areasArrayCount.length - 1;
                areasArrayCount[lastIndex] += 1;
              }
            }
          }

          setViolatedAreas(areasArray);
          setViolatedAreasCount(areasArrayCount);
        }
      );
    };
    fetchVehicleViolation();
  }, [monthToFilter]);

  const violationsByRegion = useMemo(
    () => ({
      options: {
        plugins: {
          centerText: {
            display: true,
            text: "90%",
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },

      data: {
        labels: violatedAreas,
        datasets: [
          {
            label: "Violated regions",
            data: violatedAreasCount,
            backgroundColor: [
              "#6EF07B",
              "#6FCDFB",
              "#FF65C1",
              "#BB1600",
              "#FFCF63",
            ],
          },
        ],
        text: "35",
      },
    }),
    [violatedAreasCount, violatedAreas]
  );

  return { violations, violationsByRegion, stateLoading, handleSearch };
};

// Sort by alphabetical order
function compareByArea(a: any, b: any) {
  const areaA = a.area.toUpperCase();
  const areaB = b.area.toUpperCase();

  if (areaA < areaB) {
    return -1;
  } else if (areaA > areaB) {
    return 1;
  } else {
    return 0;
  }
}
