import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import RosterManager from "./pages/RosterManager";
import DraftPick from "./pages/DraftPick";

export default function App() {
    return (
        <Router>
            <div className="flex select-none">
                <SideBar/>
                <Routes>
                    <Route path="/" element={<RosterManager/>} />
                    <Route path="/draftpick" element={<DraftPick/>} />
                </Routes>
            </div>
        </Router>
    );
}