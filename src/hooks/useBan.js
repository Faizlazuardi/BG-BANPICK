import { useState } from "react";
import { createTeamArray } from "../utils/arrayUtils";
import { TEAM_SIZE } from "../constants/gameConstant";

export const useBan = () => {
    const initialBanSelectionState = createTeamArray(TEAM_SIZE, { Name: "", img: null });
    const initialBanInputState = createTeamArray(TEAM_SIZE, "");
    const [banSelection, setBanSelection] = useState(initialBanSelectionState);
    const [banInputs, setBanInputs] = useState(initialBanInputState);

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
        initialBanInputState, banInputs, setBanInputs,
        handleBan
    };
};
