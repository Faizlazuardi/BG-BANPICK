import { useState, useEffect } from "react";
import { getPlayersByTeam } from "../../services/api.js";

export const initialplayerDataState = {
    blue: [],
    red: []
};

export const usePlayerData = (games, teamSelection) => {
    const [playerData, setPlayerData] = useState(initialplayerDataState);
    
    useEffect(() => {
        Object.entries(teamSelection).forEach(([team]) => {
            const teamPlayers = async () => {
                if (!teamSelection[team].Name) return;
                const data = await getPlayersByTeam(games, teamSelection[team].Name);
                if (!data.error) {
                    setPlayerData(prevPlayers => ({
                        ...prevPlayers,
                        [team]: data
                    }));
                }
            };
            teamPlayers();
        });
    }, [teamSelection, games]);
    return { playerData, setPlayerData };
}