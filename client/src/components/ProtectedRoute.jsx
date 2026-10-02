import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, sellerOnly = false }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role?.toLowerCase();

  const isSeller = role === "seller" || role === "entrepreneur";

  if (sellerOnly && !isSeller) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;