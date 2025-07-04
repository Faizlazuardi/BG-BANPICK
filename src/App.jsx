import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {GameProvider} from "../src/contexts/GameContext"
import {DraftProvider} from "../src/contexts/DraftContext";
import SideBar from "./components/SideBar";
import RosterManager from "./pages/RosterManager";
import DraftPick from "./pages/DraftPick";

export default function App() {
    return (
        <Router>
            <div className="flex select-none">
                <SideBar/>
                <GameProvider>
                    <DraftProvider>
                            <Routes>
                                <Route path="/" element={<DraftPick/>} />
                                <Route path="/Roaster" element={<RosterManager/>} />
                            </Routes>
                    </DraftProvider>
                </GameProvider>
            </div>
        </Router>
    );
}
