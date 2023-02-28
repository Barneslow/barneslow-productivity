import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth);

  const { userAuth, isLoggedInGuest } = user;

  if (!userAuth && !isLoggedInGuest) {
    return <Navigate to="/login" />;
  }

  return userAuth || isLoggedInGuest ? children : <h2>Not Allowed</h2>;
};

export default PrivateProtectedRoute;
