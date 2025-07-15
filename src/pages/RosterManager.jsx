import { useState } from "react";

import { X } from 'lucide-react';

import PlayerList from "../components/RoasterManager/PlayerList";
import TeamList from "../components/RoasterManager/TeamList";

export default function RosterManager() {
    const initialTeamSelectionState = {
        single: { Name: "" }
    };
    
    const [teamSelection, setTeamSelection] = useState(initialTeamSelectionState);
    
    const [isPlayerListOpen, setIsPlayerListOpen] = useState(false);
    
    const handleTeamSelectionChange = (value) => {
    setTeamSelection(prev => ({
        ...prev,
        single: {
            Id: value.Id,
            Name: value.Name
        }
    }));
        setIsPlayerListOpen(true);
    };
    
    return (
        <main className="flex flex-grow justify-evenly">
            <TeamList handleTeamSelectionChange={handleTeamSelectionChange}/>
            {isPlayerListOpen && 
                (
                    <div className="z-10 fixed inset-0 flex justify-center items-center bg-gray-900/50">
                        <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
                            <button
                                className="top-4 right-4 absolute border-none w-6 h-6 font-bold text-gray-600 hover:text-red-500 text-4xl text-center"
                                onClick={() => setIsPlayerListOpen(false)}
                            >
                                <X/>
                            </button>
                            <PlayerList teamSelection={teamSelection} />
                        </div>
                    </div>
                )
            }
        </main>
    );
}