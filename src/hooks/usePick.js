import { useState } from "react";
import { TEAM_SIZE } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export const usePick = () => {
    const initialPickSelectionState = createTeamArray(TEAM_SIZE, { Name: "", img: null });
    const initialPickInputsState = createTeamArray(TEAM_SIZE, "");
    const [pickSelection, setPickSelection] = useState(initialPickSelectionState);
    const [pickInputs, setPickInputs] = useState(initialPickInputsState);

    const handlePick = (type, team, id, value) => {
        const setState = {
            pick: setPickSelection,
            pickInput: setPickInputs,
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
        initialPickSelectionState, pickSelection, setPickSelection,
        initialPickInputsState, pickInputs, setPickInputs,
        handlePick
    };
};