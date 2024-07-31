import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bibliotekari from "./components/Bibliotekari";
import Bibliotekar from "./components/noviBibliotekar/AddBibliotekar";
import Login from "./components/LogIn/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Bibliotekari />} />
        <Route path="/bibliotekari/add" element={<Bibliotekar />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
