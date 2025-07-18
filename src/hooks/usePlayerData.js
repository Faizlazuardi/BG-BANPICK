import { useState, useEffect } from "react";
import { getAllPlayersByTeam } from "../services/api.js";

export const usePlayerData = ({ selectedGame, teamSelection, initialPlayerDataState }) => {
    const [playerData, setPlayerData] = useState(initialPlayerDataState);
    useEffect(() => {
        Object.entries(teamSelection).forEach(([role]) => {
            (async () => {
                if (!teamSelection[role].Name) return;

                const data = await getAllPlayersByTeam(selectedGame, teamSelection[role].Name);
                if (!data.error) {
                    setPlayerData(prevPlayers => ({
                        ...prevPlayers,
                        [role]: data
                    }));
                }
            })();
        });
    }, [teamSelection, selectedGame]);

    return {
        playerData,
        setPlayerData
    };
}