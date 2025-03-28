import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import DraftPick from "./pages/DraftPick";

export default function App() {
    return (
        <Router>
            <div className="flex select-none">
                <SideBar/>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/draftpick" element={<DraftPick />} />
                </Routes>
            </div>
        </Router>
    );
}