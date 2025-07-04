import { useState } from "react";
import { TEAM_SIZE } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export const usePick = (playerInputs) => {
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

    const handleShiftPick = (team, id) => {
        let shiftId = id;
        
        while (shiftId > 0 && pickSelection[team][shiftId - 1].img === null) {
            shiftId--;
        }
        
        if (shiftId !== id) {
            [pickInputs[team][shiftId], pickInputs[team][id]] = [pickInputs[team][id], pickInputs[team][shiftId]];
            [playerInputs[team][shiftId], playerInputs[team][id]] = [playerInputs[team][id], playerInputs[team][shiftId]];
            return shiftId;
        }
        return id;
    }

    return {
        initialPickSelectionState, pickSelection, setPickSelection,
        initialPickInputsState, pickInputs, setPickInputs,
        handlePick,
        handleShiftPick
    };
};