import { firestoredb } from "../../config/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  or,
} from "firebase/firestore";

const fetchAllViolation = async () => {
  const violationsRef = collection(firestoredb, "speedViolations");
  // Fetching violations
  const res = await getDocs(violationsRef);

  const violationsRes = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return filterDuplicatesByCreationDateTime(violationsRes);
};

const fetchAllViolatedVehicle = async () => {
  const violationsRef = collection(firestoredb, "speedViolations");
  // Fetching violations
  const res = await getDocs(violationsRef);

  const violationsRes = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return filterLatest(violationsRes, "vehicleNumberPlate");
};

const violationSearch = async (cond?: string) => {
  const violationsRef = collection(firestoredb, "speedViolations");
  // Search violation
  const violations = query(
    violationsRef,
    or(where("vehicleNumberPlate", "==", cond), where("area", "==", cond))
  );

  const res = await getDocs(violations);

  const violationsRes = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return filterLatest(violationsRes, "vehicleNumberPlate");
};

const fetchSpecificVehicleViolations = async (vehicle: string) => {
  const violationsRef = collection(firestoredb, "speedViolations");
  // Vehicle violations
  const violations = query(
    violationsRef,
    where("vehicleNumberPlate", "==", vehicle)
  );

  const res = await getDocs(violations);

  const violationsRes = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return filterDuplicatesByCreationDateTime(violationsRes);
};

const addSpeedViolation = async (violation: any) => {
  const violationRef = collection(firestoredb, "speedViolations");
  // Fetching violations
  const res = await addDoc(violationRef, violation);

  return res;
};

const SpeedVoilationServices = {
  fetchAllViolation,
  violationSearch,
  addSpeedViolation,
  fetchSpecificVehicleViolations,
  fetchAllViolatedVehicle,
};

export default SpeedVoilationServices;

function filterLatest(data: any[], key: any) {
  const filteredData: any[] = [];
  const latestObjects: any = {};

  for (const obj of data) {
    const value = obj[key];
    if (!latestObjects[value] || obj.dateTime > latestObjects[value].dateTime) {
      latestObjects[value] = obj;
    }
  }

  for (const key in latestObjects) {
    filteredData.push(latestObjects[key]);
  }

  return filteredData;
}

function filterDuplicatesByCreationDateTime(data: any[]) {
  data.sort((a, b) => a.dateTime - b.dateTime);

  console.log(data);

  const filteredArray = [];
  let previousTime = null;

  for (const obj of data) {
    if (obj.dateTime !== previousTime) {
      filteredArray.push(obj);
      previousTime = obj.dateTime;
    }
  }

  console.log(filteredArray);
  

  return filteredArray;
}
