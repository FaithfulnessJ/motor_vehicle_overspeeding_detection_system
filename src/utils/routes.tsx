import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import {
  Home,
  VehicleRegistration,
  ViewYourVehicle,
  ViewYourViolations,
} from "../pages/user_pages";
import {
  Vehicles,
  ViewVehicle,
  SpeedViolations,
  ViewVehicleViolations,
} from "../pages/admin_pages";
import AdminCheck from "./middleware/AdminCheck";
import AuthCheck from "./middleware/AuthCheck";

export const routes = [
  // Authentication route
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  //   User Routes
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-vehicle",
    element: (
      <AuthCheck>
        <VehicleRegistration />
      </AuthCheck>
    ),
  },
  {
    path: "/vehicle/:vehicleID",
    element: (
      <AuthCheck>
        <ViewYourVehicle />
      </AuthCheck>
    ),
  },
  {
    path: "/my-violations",
    element: (
      <AuthCheck>
        <ViewYourViolations />
      </AuthCheck>
    ),
  },

  // Admin routes
  {
    path: "/admin/vehicles",
    element: (
      <AdminCheck>
        <Vehicles />
      </AdminCheck>
    ),
  },
  {
    path: "/admin/speed-violations",
    element: (
      <AdminCheck>
        <SpeedViolations />
      </AdminCheck>
    ),
  },
  {
    path: "/admin/speed-violations/:vehicle",
    element: (
      <AdminCheck>
        <ViewVehicleViolations />
      </AdminCheck>
    ),
  },
  {
    path: "/admin/vehicles/:vehicleID",
    element: (
      <AdminCheck>
        <ViewVehicle />
      </AdminCheck>
    ),
  },
];
