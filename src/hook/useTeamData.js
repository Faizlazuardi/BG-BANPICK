import { useState, useEffect } from "react";
import { getTeams } from "../../services/api.js";

export const useTeamData = (games) => {
    const [teamData, setTeamData] = useState([]);
    
    useEffect(() => {
        (async () => {
            const team = await getTeams(games);
            if (!team.error) setTeamData(team);
        })()
    }, [games]);
    return { teamData };
};