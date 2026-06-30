import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ReportIssue from "./pages/ReportIssue";
import Dashboard from "./pages/Dashboard";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

function App() {
  return (
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/report" element={<ReportIssue />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
  );
}

export default App;