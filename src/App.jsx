import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NewBuildingPage from "./pages/DashboardPage/NewBuildingPage/NewBuildingPage";
import AnnouncementsPage from "./pages/AnnouncementsPage/AnnouncementsPage";
import PollsPage from "./pages/PollsPage/PollsPage";
import NeighborDirectoryPage from "./pages/NeighborDirectoryPage/NeighborDirectoryPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import NavbarComponent from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App d-flex flex-column">
      <Container fluid className = "d-flex flex-column px-0 min-vh-100">
      {<NavbarComponent />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <IsPrivate>
              <DashboardPage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/create-building"
          element={
            <IsPrivate>
              <NewBuildingPage />
            </IsPrivate>
          }
        />
        <Route
          path="/announcements"
          element={
            <IsPrivate>
              <AnnouncementsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/polls"
          element={
            <IsPrivate>
              <PollsPage />
            </IsPrivate>
          }
        />
        <Route
        path="/directory"
        element={
          <IsPrivate>
            <NeighborDirectoryPage/>
          </IsPrivate>
        }
        />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
      </Container>
    </div>
  );
}

export default App;
