import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import DraftPick from "./pages/DraftPick";

function App() {
    return (
        <Router>
            <MainContent />
        </Router>
    );
}

function MainContent() {
    const location = useLocation();

    const showSidebar = location.pathname === "/" || location.pathname === "/draftpick";

    return (
        <div className="flex select-none">
            {showSidebar && <SideBar />}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/draftpick" element={<DraftPick />} />
            </Routes>
        </div>
    );
}

export default App;