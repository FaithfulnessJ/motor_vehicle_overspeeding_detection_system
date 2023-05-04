import { useState, useEffect } from "react";
import SpeedVoilationServices from "../utils/services/SpeedVoilationServices";

export const useViolation = () => {
  const [violations, setViolations] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllViolations = async () => {
      await SpeedVoilationServices.fetchAllViolation().then((response) => {
        setViolations(response);
      });
    };
    fetchAllViolations();
  }, []);

  return { violations };
};

export const useMyViolation = (userId: string) => {
  const [violations, setViolations] = useState<any[]>([]);

  useEffect(() => {
    const fetchMyViolations = async () => {
      await SpeedVoilationServices.fetchAllViolation().then((response) => {
        setViolations(response.filter((res: any) => res?.user === userId));
      });
    };
    fetchMyViolations();
  }, []);

  return { violations };
};
