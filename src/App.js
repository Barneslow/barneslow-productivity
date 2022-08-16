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
            path="/"
            element={
              <PrivateProtectedRoute>
                <Dashboard />
              </PrivateProtectedRoute>
            }
          ></Route>
          <Route
            path="/study"
            element={
              <PrivateProtectedRoute>
                <TimerContainer />
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
            path="/leaderboard"
            element={
              <PrivateProtectedRoute>
                <LeaderBoardContainer />
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
