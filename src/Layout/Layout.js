import Footer from "./footer/Footer";
import NavBar from "./navigation/NavBar";

import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
