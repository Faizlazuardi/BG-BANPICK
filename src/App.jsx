import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GameProvider } from "../src/contexts/GameContext"
import { DraftProvider } from "../src/contexts/DraftContext";
import SideBar from "./components/SideBar";
import RosterManager from "./pages/RosterManager";
import DraftPick from "./pages/DraftPick";
import Login from "./pages/Login"

function AppContent() {
    const location = useLocation();
    const hideSidebar = location.pathname === "/login";

    return (
        <div className="flex select-none">
            {!hideSidebar && <SideBar />}
            <Routes>
                <Route path="/" element={<DraftPick />} />
                <Route
                    path="/roaster"
                    element={ <RosterManager /> } />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <GameProvider>
            <DraftProvider>
                <Router>
                    <AppContent />
                </Router>
            </DraftProvider>
        </GameProvider>
    );
}
