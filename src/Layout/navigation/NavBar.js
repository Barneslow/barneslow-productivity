import { useSelector } from "react-redux";
import UserNavBar from "./UserNavBar";
import PublicNavBar from "./PublicNavBar";

const NavBar = () => {
  const { userAuth } = useSelector((state) => state.authentication);

  return <>{userAuth ? <UserNavBar /> : <PublicNavBar />}</>;
};

export default NavBar;
