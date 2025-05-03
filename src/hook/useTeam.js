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
        teamInput,
        setTeamInput,
        handleTeamInputChange,

        teamSelection,
        setTeamSelection,
        handleTeamChange,
        handleWinCheckChange
    };
};
