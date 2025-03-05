import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
