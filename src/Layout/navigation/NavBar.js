import { useDispatch, useSelector } from "react-redux";
import UserNavBar from "./UserNavBar";
import PublicNavBar from "./PublicNavBar";
// import { selectMemoUser } from "../../store/authSlice";

const NavBar = () => {
  const userAuth = useSelector((state) => state.authentication.userAuth);

  return (
    <>{userAuth ? <UserNavBar userAuth={userAuth} /> : <PublicNavBar />}</>
  );
};

export default NavBar;
