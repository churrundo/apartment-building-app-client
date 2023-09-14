import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NewBuildingPage from "./pages/DashboardPage/NewBuildingPage/NewBuildingPage";
import AnnouncementsPage from "./pages/AnnouncementsPage/AnnouncementsPage";
import PollsPage from "./pages/PollsPage/PollsPage";
import NewPollForm from "./pages/PollsPage/NewPollForm/NewPollForm";
import NewAnnouncementForm from "./pages/AnnouncementsPage/NewAnnouncementForm/NewAnnouncementForm";
import NeighborDirectoryPage from "./pages/NeighborDirectoryPage/NeighborDirectoryPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      {<Navbar />}

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
        <Route
          path="/new-poll"
          element={
            <IsPrivate>
              <NewPollForm />
            </IsPrivate>
          }
        />
        <Route
          path="/new-announcement"
          element={
            <IsPrivate>
              <NewAnnouncementForm />
            </IsPrivate>
          }
        />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
