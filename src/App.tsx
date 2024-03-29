import { Header, Navbar, ProtectedRoute } from "./components";
import React from "react";
import { useWallet } from "./hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Profile, SignIn, TicketDetails, Upload, VideoPlayer } from "./pages";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
       >
       </Route>
       <Route path="/dashboard/video" element={<VideoPlayer />} />
       <Route path="/ticket" element={<TicketDetails />} />
       <Route path="/profile/:id" element={<Profile />} />
       <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
