import { useState, useEffect } from "react";
import { getPlayersByTeam } from "../services/api.js";

export const usePlayerData = ({ games, teamSelection, initialPlayerDataState }) => {
    const [playerData, setPlayerData] = useState(initialPlayerDataState);
    useEffect(() => {
        Object.entries(teamSelection).forEach(([role]) => {
            (async () => {
                if (!teamSelection[role].Name) return;
                
                const data = await getPlayersByTeam(games, teamSelection[role].Name);
                console.log(`Fetching players for ${role}:`, data);
                if (!data.error) {
                    setPlayerData(prevPlayers => ({
                        ...prevPlayers,
                        [role]: data
                    }));
                }
            })();
        });
    }, [teamSelection, games]);
    
    return { 
        playerData, 
        setPlayerData 
    };
}