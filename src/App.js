import Layout from "./Layout/Layout";
import TimerContainer from "./components/Timer/TimerContainer";
import StatsContainer from "./components/Stats/StatsContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserCard from "./components/User/UserCard";
import UserContainer from "./components/User/UserContainer";
import Login from "./components/Auth/Login";
import PrivateProtectedRoute from "./routes/PrivateProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateProtectedRoute>
                  <UserContainer />
                  <StatsContainer />
                  <TimerContainer />
                </PrivateProtectedRoute>
              }
            ></Route>
          </Routes>
        </Layout>
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
