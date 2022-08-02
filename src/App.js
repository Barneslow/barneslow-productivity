import Layout from "./Layout/Layout";
import TimerContainer from "./components/Timer/TimerContainer";
import StatsContainer from "./components/Stats/StatsContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContainer from "./components/User/UserContainer";
import LoginPage from "./components/Auth/LoginPage";
import PrivateProtectedRoute from "./routes/PrivateProtectedRoute";
import NavBar from "./Layout/navigation/NavBar";
import Footer from "./Layout/footer/Footer";
import TasksContainer from "./components/Tasks/TasksContainer";
import Session from "./components/Sessions/Session";
import Contact from "./Layout/Legal/Contact";
import TermsOfService from "./Layout/Legal/TermsOfService";
import Privacy from "./Layout/Legal/Privacy";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/dashboard"
            element={
              <PrivateProtectedRoute>
                <Layout>
                  <UserContainer />
                  <StatsContainer />
                  <TimerContainer />
                </Layout>
              </PrivateProtectedRoute>
            }
          ></Route>
          <Route
            path="/tasks"
            element={
              <PrivateProtectedRoute>
                <TasksContainer />
              </PrivateProtectedRoute>
            }
          />
          <Route
            path="/sessions/:id"
            element={
              <PrivateProtectedRoute>
                <Session />
              </PrivateProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Layout>
<Login />
<UserContainer />
<StatsContainer />
<TimerContainer />
</Layout> */
}
