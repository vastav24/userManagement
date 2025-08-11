import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AddEditUser = lazy(() => import("../pages/AddEditUser"));
const ViewUser = lazy(() => import("../pages/ViewUser"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user" element={<AddEditUser />} />
        <Route path="/edit-user/:id" element={<AddEditUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
