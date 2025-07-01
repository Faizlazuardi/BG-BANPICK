import { useState } from "react";
import { createTeamArray } from "../utils/arrayUtils";
import { TEAM_SIZE } from "../constants/gameConstant";

export const usePick = (playerInputs) => {
    const initialPickSelectionState = createTeamArray(TEAM_SIZE, { Name: "", img: null });
    const initialPickInputState = createTeamArray(TEAM_SIZE, "");
    const [pickSelection, setPickSelection] = useState(initialPickSelectionState);
    const [pickInputs, setPickInputs] = useState(initialPickInputState);

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
        initialPickInputState, pickInputs, setPickInputs,
        handlePick,
        handleShiftPick
    };
};