import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import PrivateProtectedRoute from "./routes/PrivateProtectedRoute";
import NavBar from "./Layout/navigation/NavBar";
import Footer from "./Layout/footer/Footer";
import TasksContainer from "./components/Tasks/TasksContainer";
import Session from "./components/Sessions/Session";
import Contact from "./Layout/Legal/Contact";
import TermsOfService from "./Layout/Legal/TermsOfService";
import Privacy from "./Layout/Legal/Privacy";
import Dashboard from "./Layout/Dashboard";
import TimerContainer from "./components/Timer/TimerContainer";
import LeaderBoardContainer from "./components/LeaderBoard/LeaderBoardContainer";
import Settings from "./components/Settings/Settings";
import ViewUser from "./components/User/ViewUser";
import StoreContainer from "./components/Shop/ShopContainer";
import Checkout from "./components/Cart/Checkout";
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/user/:id" element={<ViewUser />} />
          <Route path="/store" element={<StoreContainer />} />
          <Route
            path="/"
            element={
              <PrivateProtectedRoute>
                <Dashboard />
              </PrivateProtectedRoute>
            }
          />
          <Route
            path="/study"
            element={
              <PrivateProtectedRoute>
                <TimerContainer />
              </PrivateProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateProtectedRoute>
                <TasksContainer />
              </PrivateProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateProtectedRoute>
                <LeaderBoardContainer />
              </PrivateProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateProtectedRoute>
                <Settings />
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
          <Route
            path="/checkout"
            element={
              <PrivateProtectedRoute>
                <Checkout />
              </PrivateProtectedRoute>
            }
          />

          {/* <Route
            path="/calendar"
            element={
              <PrivateProtectedRoute>
                <Calendar />
              </PrivateProtectedRoute>
            }
          /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
