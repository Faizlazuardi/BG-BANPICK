import { useState } from "react";
import DefaultTeamLogo from "/src/assets/80x80.png";

export const initialTeamSelectionState = {
    blue: { Name: "", Logo: DefaultTeamLogo, WinCheck: [false, false, false] },
    red: { Name: "", Logo: DefaultTeamLogo, WinCheck: [false, false, false] }
};

export const initialTeamInputState = {
    blue: "",
    red: ""
};

export const useTeam = () => {
    const [teamSelection, setTeamSelection] = useState(initialTeamSelectionState);
    const [teamInputs, setTeamInputs] = useState(initialTeamInputState);

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

    const handleTeamNameInputChange = (team, value) => {
        setTeamInputs(prev => ({
            ...prev,
            [team]: value
        }));
    };

    return {
        teamInputs,
        setTeamInputs,
        handleTeamNameInputChange,

        teamSelection,
        setTeamSelection,
        handleTeamChange,
        handleWinCheckChange
    };
};
