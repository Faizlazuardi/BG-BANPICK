import { useState } from "react";
import { TEAM_SIZE } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export const usePlayer = () => {
    const initialPlayerInputsState = createTeamArray(TEAM_SIZE, "");
    const [playerInputs, setPlayerInputs] = useState(initialPlayerInputsState);

    const handlePlayerInputsChange = (type, team, id, value) => {
        const setState = {
            playerInput: setPlayerInputs
        }[type];

        if (setState) {
            setState(prev => ({
                ...prev,
                [team]: prev[team].map((item, i) => (i === id ? value : item))
            }));
            return;
        }
    };

    return {
        initialPlayerInputsState, playerInputs, setPlayerInputs, handlePlayerInputsChange
    };
};
