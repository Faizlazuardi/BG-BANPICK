import { useState, useEffect } from "react";
import { getAllTeams } from "../services/api.js";

export const useTeamData = (selectedGame) => {
    const [teamData, setTeamData] = useState([]);
    
    useEffect(() => {
        (async () => {
            const team = await getAllTeams(selectedGame);
            if (!team.error) setTeamData(team);
        })()
    }, [selectedGame]);
    return { teamData };
};