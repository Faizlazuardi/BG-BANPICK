import { useState } from "react";

// Initial states
const createArrayState = (value, length = 5) => ({
    blue: Array(length).fill(value),
    red: Array(length).fill(value)
});

export const initialBanSelectionState = createArrayState({ Name: "", img: null });
export const initialBanInputState = createArrayState("");

export const useBan = () => {
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
        banSelection, setBanSelection,
        banInputs, setBanInputs,
        handleBan
    };
};
