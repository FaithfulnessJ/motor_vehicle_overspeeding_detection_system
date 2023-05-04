import { firestoredb } from "../../config/firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export type VehicleType = {
  id?: string;
  owner: string;
  vehicleNumberPlate: string;
  phoneNumber: string;
  userId: string;
  sensorId?: string;
};

const fetchAllVehicles = async () => {
  const vehiclesRef = collection(firestoredb, "vehicles");
  // Fetching vehicles
  const res = await getDocs(vehiclesRef);

  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const fetchVehicle = async (id: string) => {
  const vehicleRef = doc(firestoredb, "vehicles", id);
  // Fetching a vehicle
  const res = await getDoc(vehicleRef);

  return res;
};

const fetchUserVehicles = async (userId: string) => {
  const vehiclesRef = collection(firestoredb, "vehicles");
  
  const userVehicles = query(vehiclesRef, where("userId", "==", userId));

  const res = await getDocs(userVehicles);

  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const addVehicle = async (vehicle: VehicleType) => {
  const vehicleRef = collection(firestoredb, "vehicles");
  // Adding a vehicle
  const res = await addDoc(vehicleRef, vehicle);

  return res;
};

const editVehicle = async (id: string, vehicle: VehicleType) => {
  const vehicleRef = doc(firestoredb, "vehicles", id);
  // Updating vehicles
  const res = await updateDoc(vehicleRef, vehicle);

  return res;
};

const addSensorId = async (id: string, vehicle: VehicleType) => {
  const vehicleRef = doc(firestoredb, "vehicles", id);
  // Updating vehicles
  const res = await updateDoc(vehicleRef, vehicle);

  return res;
};

const VehicleServices = {
  fetchAllVehicles,
  fetchVehicle,
  fetchUserVehicles,
  addVehicle,
  editVehicle,
  addSensorId,
};

export default VehicleServices;
