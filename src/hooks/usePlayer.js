import { useState } from "react";
import { createTeamArray } from "../utils/arrayUtils";
import { TEAM_SIZE } from "../constants/gameConstant";

export const usePlayer = () => {
    const initialPlayerInputState = createTeamArray(TEAM_SIZE, "");
    const [playerInputs, setPlayerInputs] = useState(initialPlayerInputState);

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
        initialPlayerInputState,playerInputs, setPlayerInputs, handlePlayerInputsChange
    };
};
