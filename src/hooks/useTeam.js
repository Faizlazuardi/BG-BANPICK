import { useState } from "react";
import { useGameContext } from "../contexts/GameContext";

export const useTeam = () => {
    const { requiredWins } = useGameContext();

    const initialTeamSelectionState = {
        blue: { Name: "", Logo: null, WinCheck: Array(requiredWins).fill(false) },
        red: { Name: "", Logo: null, WinCheck: Array(requiredWins).fill(false) }
    };

    const initialTeamInputState = {
        blue: "",
        red: ""
    };

    const [teamSelection, setTeamSelection] = useState(initialTeamSelectionState);
    const [teamInput, setTeamInput] = useState(initialTeamInputState);

    const handleTeamChange = (team, { name, logo }) => {
        setTeamSelection(prev => ({
            ...prev,
            [team]: {
                ...prev[team],
                Name: name,
                Logo: logo
            }
        }));
    };

    const handleWinCheckChange = (team, index) => {
        setTeamSelection(prev => {
            const newWinCheck = [...prev[team].WinCheck];
            newWinCheck[index] = !newWinCheck[index];
            return {
                ...prev,
                [team]: {
                    ...prev[team],
                    WinCheck: newWinCheck
                }
            };
        });
    };

    const handleTeamInputChange = (team, value) => {
        setTeamInput(prev => ({
            ...prev,
            [team]: value
        }));
    };

    return {
        initialTeamSelectionState,
        teamSelection,
        setTeamSelection,
        handleTeamChange,
        handleWinCheckChange,

        initialTeamInputState,
        teamInput,
        setTeamInput,
        handleTeamInputChange,
    };
};
