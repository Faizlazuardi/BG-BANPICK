import { useState, useEffect } from "react";
import { getTeams } from "../../services/api.js";

export const useTeamData = (games) => {
    const [teamData, setTeamData] = useState([]);
    
    useEffect(() => {
        const fetchTeamData = async () => {
            const team = await getTeams(games);
            if (!team.error) setTeamData(team);
        };
        fetchTeamData();
    }, [games]);
    return { teamData };
};