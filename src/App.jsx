import { Routes, Route } from "react-router-dom";

import { MovieProvider } from "./contexts/MovieContext";
import { SettingsProvider } from "./contexts/SettingsContext";

import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
// import ViewToggle from "./components/ViewToggle";
// import ThemeToggle from "./components/ThemeToggle";
import PreferencesPanel from "./components/PreferencesPanel";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Backups from "./pages/Backups";
// import "./css/App.css";

function App() {
  return (
    <SettingsProvider>
      <MovieProvider>

        <Header />

        <main className="main-content">
          <PreferencesPanel />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/backups" element={<Backups />} />
          </Routes>
        </main>

        {/* <Footer /> */}

      </MovieProvider>
    </SettingsProvider>
  );
}

export default App;