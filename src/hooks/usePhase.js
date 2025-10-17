import { useState, useEffect, useMemo, useCallback } from "react";
import { useGameContext } from "../contexts/GameContext";
import { TEAM_SIZE, generatePhaseActions } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export const usePhase = (banSelection, pickSelection) => {
    const { selectedTotalBan } = useGameContext()
    const initialHighlights = useMemo(() => createTeamArray(TEAM_SIZE, false), []);
    const [highlights, setHighlights] = useState(initialHighlights);
    const [phase, setPhase] = useState(0);

const phaseActions = useMemo(() => {
    switch (selectedTotalBan) {
        case 3:
            return generatePhaseActions(2, 3);
        case 5:
            return generatePhaseActions(3, 5);
        default:
            return generatePhaseActions(3, 5);
    }
}, [selectedTotalBan]);

    const action = phaseActions[phase];

    const updateHighlights = useCallback((team, index) => {
        setHighlights((prev) => ({
            ...prev,
            [team]: prev[team].map((_, i) =>
                Array.isArray(index) ? index.includes(i) : i === index
            ),
        }));
    }, []);

    const highlightCurrentPhase = useCallback(() => {
        if (action.index[0] === null) return;
        const { team, index } = action;
        setHighlights(initialHighlights);
        updateHighlights(team, index);
    }, [phase, phaseActions, initialHighlights, updateHighlights]);

    const isSelectionFilled = useCallback((action) => {
        const { type, team, index } = action;
        const selection = type === "ban" ? banSelection : pickSelection;

        if (Array.isArray(index)) {
        return index.every((id) => selection[team][id]?.img !== null);
        }
        return selection[team][index]?.img !== null;
    }, [banSelection, pickSelection]);

    const handleUpdatePhase = useCallback(() => {
        if (action.index[0] === null) return;
        if (isSelectionFilled(action)) {
            setPhase((prev) => prev + 1);
        }
    }, [phase, phaseActions, isSelectionFilled]);

    useEffect(() => {
        highlightCurrentPhase();
    }, [highlightCurrentPhase]);

    useEffect(() => {
        handleUpdatePhase();
    }, [pickSelection, banSelection, handleUpdatePhase]);

    return {
        initialHighlights,
        highlights,
        setHighlights,
        setPhase,
        phase,
        action
    };
};