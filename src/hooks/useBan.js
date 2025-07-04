import { useState } from "react";
import { TEAM_SIZE } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export const useBan = () => {
    const initialBanSelectionState = createTeamArray(TEAM_SIZE, { Name: "", img: null });
    const initialBanInputsState = createTeamArray(TEAM_SIZE, "");
    const [banSelection, setBanSelection] = useState(initialBanSelectionState);
    const [banInputs, setBanInputs] = useState(initialBanInputsState);

    const handleBan = (type, team, id, value) => {
        const setState = {
            ban: setBanSelection,
            banInput: setBanInputs
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
        initialBanSelectionState, banSelection, setBanSelection,
        initialBanInputsState, banInputs, setBanInputs,
        handleBan
    };
};
