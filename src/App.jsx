import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}
export default App;
