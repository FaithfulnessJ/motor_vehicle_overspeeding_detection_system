import { firestoredb } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const fetchAllMonitoredGeoLocations = async () => {
  const monitoredGeoLocationsRef = collection(
    firestoredb,
    "monitoredgeopositions"
  );
  // Fetching vehicles
  const res = await getDocs(monitoredGeoLocationsRef);

  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const MonitoredGeoLocationServices = {
  fetchAllMonitoredGeoLocations
};

export default MonitoredGeoLocationServices;
