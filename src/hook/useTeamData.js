import { useState, useEffect } from "react";
import { getTeams } from "../services/api.js";

export const useTeamData = (selectedGame) => {
    const [teamData, setTeamData] = useState([]);
    
    useEffect(() => {
        (async () => {
            const team = await getTeams(selectedGame);
            if (!team.error) setTeamData(team);
        })()
    }, [selectedGame]);
    return { teamData };
};