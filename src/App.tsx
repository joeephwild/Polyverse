import { Header, Navbar, ProtectedRoute } from "./components";
import React from "react";
import { useWallet } from "./hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, SignIn, VideoPlayer } from "./pages";
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
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
       >
       </Route>
       <Route path="/dashboard/video" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
