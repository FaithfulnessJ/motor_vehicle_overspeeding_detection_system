import { firestoredb } from "../../config/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

const fetchAllViolation = async () => {
    const vehiclesRef = collection(firestoredb, "speedViolations");
    // Fetching vehicles
    const res = await getDocs(vehiclesRef);
  
    return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };
  
  
  const addSpeedViolation = async (vehicle: any) => {
    const vehicleRef = collection(firestoredb, "speedViolations");
    // Fetching vehicles
    const res = await addDoc(vehicleRef, vehicle);
  
    return res;
  };
  
  const SpeedVoilationServices = {
    fetchAllViolation,
    addSpeedViolation
  };
  
  export default SpeedVoilationServices;