import { useState, useEffect, useMemo, useCallback } from "react";
import { TEAM_SIZE, generatePhaseActions } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export const usePhase = (banSelection, pickSelection) => {
    const initialHighlights = useMemo(() => createTeamArray(TEAM_SIZE, false), []);
    const [highlights, setHighlights] = useState(initialHighlights);
    const [phase, setPhase] = useState(0);

    const phaseActions = useMemo(() => generatePhaseActions(), []);
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
        if (!action) return;
        const { team, index } = action;
        setHighlights(initialHighlights);
        updateHighlights(team, index);
    }, [phase, phaseActions, initialHighlights, updateHighlights]);

    const isSelectionReady = useCallback((action) => {
        const { type, team, index } = action;
        const selection = type === "ban" ? banSelection : pickSelection;

        if (Array.isArray(index)) {
        return index.every((id) => selection[team][id]?.img !== null);
        }
        return selection[team][index]?.img !== null;
    }, [banSelection, pickSelection]);

    const checkAndAdvancePhase = useCallback(() => {
        if (!action) return;
        if (isSelectionReady(action)) {
            setPhase((prev) => prev + 1);
        }
    }, [phase, phaseActions, isSelectionReady]);

    useEffect(() => {
        highlightCurrentPhase();
    }, [highlightCurrentPhase]);

    useEffect(() => {
        checkAndAdvancePhase();
    }, [pickSelection, banSelection, checkAndAdvancePhase]);

    return {
        initialHighlights,
        highlights,
        setHighlights,
        setPhase,
        phase,
        action
    };
};