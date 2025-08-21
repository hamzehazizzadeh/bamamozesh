import { Routes, Route, Navigate } from "react-router-dom";

import NotFoundPage from "./../../pages/Page/NotFoundPage/NotFoundPage";
import PublicLayout from "../../layouts/PublicLayout/PublicLayout";

const PublicContainer = () => {
  return (
    <PublicLayout>
      <Routes>
        {/* Home */}
        <Route index element={<Navigate to="/auth/login" replace />} />

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicContainer;
