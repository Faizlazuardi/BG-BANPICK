import { useState } from "react";

import { X } from 'lucide-react';

import PlayerList from "../components/PlayerList";
import TeamList from "../components/TeamList";

import { useTeamData } from "../hook/useTeamData";
import { usePlayerData } from "../hook/usePlayerData";

const gameOption = [
    { id: "1", game: "MLBB" },
];

export default function RosterManager() {
    const initialTeamSelectionState = {
        single: { Name: "" }
    };
    const initialPlayerDataState = {
        single: []
    };

    const [games, setGame] = useState(gameOption[0].game);
    const { teamData } = useTeamData(games);

    const [teamSelection, setTeamSelection] = useState(initialTeamSelectionState);
    const { playerData } = usePlayerData({ games, teamSelection, initialPlayerDataState });

    const [isPlayerListOpen, setIsPlayerListOpen] = useState(false);

    const handleTeamSelectionChange = (value) => {
        setTeamSelection({
            single: {
                Name: value
            }
        });
        setIsPlayerListOpen(true);
    };

    return (
        <main className="flex flex-grow justify-evenly">
            <TeamList teamData={teamData} handleTeamSelectionChange={handleTeamSelectionChange}/>
            {isPlayerListOpen && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900/50">
                    <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
                        <button
                            className="top-4 right-4 absolute border-none w-6 h-6 font-bold text-gray-600 hover:text-red-500 text-4xl text-center"
                            onClick={() => setIsPlayerListOpen(false)}
                        >
                            <X/>
                        </button>
                        <PlayerList team={teamSelection.single.Name} playerData={playerData} />
                    </div>
                </div>
            )}
        </main>
    );
}