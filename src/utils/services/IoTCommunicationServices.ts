import { realtimedb } from "../../config/firebaseConfig";
import { set, ref, onValue } from "@firebase/database";
import { VehicleType } from "./VehicleServices";

const fetchAllConnections = async () => {
  let allConnections: any[] = [];
  onValue(ref(realtimedb), (snapshot) => {
    const connections = snapshot.val();

    Object.values(connections).map((connection) => {
      allConnections.push(connection);
    });
  });

  return allConnections
};

const makeConnection = async (vehicleData: VehicleType) => {
  set(ref(realtimedb, `/${vehicleData?.id}`), vehicleData);
};

const updateSpeedViolation = async (vehicleData: any) => {
  set(ref(realtimedb, `/${vehicleData?.id}`), vehicleData);
};


// const fetchVehiclePositionData = async (sensorId:any) => {
//   let vehiclePositionData = {};
//   onValue(ref(realtimedb, `/${sensorId}`), (snapshot) => {
//     vehiclePositionData = snapshot.val(); 
//   });

//   return vehiclePositionData
// };

const IoTCommunicationServices = {
  fetchAllConnections,
  makeConnection,
  updateSpeedViolation
};

export default IoTCommunicationServices;
