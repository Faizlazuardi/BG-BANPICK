import { useState } from "react";

// Initial states
const createArrayState = (value, length = 5) => ({
    blue: Array(length).fill(value),
    red: Array(length).fill(value)
});

export const initialPickSelectionState = createArrayState({ Name: "", img: null });
export const initialPickInputState = createArrayState("");

export const usePick = (playerInputs) => {
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
        pickSelection, setPickSelection,
        pickInputs, setPickInputs,
        handlePick,
        handleShiftPick
    };
};