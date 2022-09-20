import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth);

  const { userAuth } = user;

  if (!userAuth) {
    return <Navigate to="/login" />;
  }

  return userAuth ? children : <h2>Not Allowed</h2>;
};

export default PrivateProtectedRoute;
