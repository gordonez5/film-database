import { Routes, Route } from "react-router-dom";

import { MovieProvider } from "./contexts/MovieContext/MovieProvider";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Library from "./pages/Library";
import "./css/App.css";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;