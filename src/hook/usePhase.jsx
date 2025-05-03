import { useState, useEffect } from "react";

const generatePhaseActions = () => {
    const actions = [];
    
    // First Ban Phase
    for (let i = 0; i < 3; i++) {
        actions.push({ type: 'ban', team: 'blue', index: i });
        actions.push({ type: 'ban', team: 'red', index: i });
    }
    
    // Pick Phase 1
    actions.push({ type: 'pick', team: 'blue', index: 0 });
    actions.push({ type: 'pick', team: 'red', index: [0, 1] });
    actions.push({ type: 'pick', team: 'blue', index: [1, 2] });
    actions.push({ type: 'pick', team: 'red', index: 2 });
    
    // Second Ban Phase
    for (let i = 3; i < 5; i++) {
        actions.push({ type: 'ban', team: 'red', index: i });
        actions.push({ type: 'ban', team: 'blue', index: i });
    }
    
    // Final Pick Phase
    actions.push({ type: 'pick', team: 'red', index: 3 });
    actions.push({ type: 'pick', team: 'blue', index: [3, 4] });
    actions.push({ type: 'pick', team: 'red', index: 4 });
    return actions;
};

export const initialPhaseState = {
    blue: Array(5).fill(false),
    red: Array(5).fill(false)
};

export const usePhase = (banSelection, pickSelection) => {
    
    const [phase, setPhase] = useState(0);
    const phaseActions = generatePhaseActions();

    const [highlights, setHighlights] = useState(initialPhaseState);
    
    const highlightCurrentPhase = () => {
        const action = phaseActions[phase];
        if (!action) return;
    
        const {team, index } = action;
    
        setHighlights({
            blue: Array(5).fill(false),
            red: Array(5).fill(false)
        });
    
        if (Array.isArray(index)) {
            setHighlights(prev => ({
                ...prev,
                [team]: prev[team].map((val, i) => index.includes(i) ? true : false)
            }));
        } else {
            setHighlights(prev => ({
                ...prev,
                [team]: prev[team].map((val, i) => i === index ? true : false)
            }));
        }
    };
    
    const checkAndAdvancePhase = () => {
        const action = phaseActions[phase];
        if (!action) return;
    
        const { type, team, index } = action;
        const selection = type === 'ban' ? banSelection : pickSelection;
    
        const isReady = () => {
            if (Array.isArray(index)) {
                return index.every((id) => selection[team][id].img !== null);
            }
            return selection[team][index].img !== null;
        };
    
        if (isReady()) {
            setPhase(prev => prev + 1);
        }
    };
    
    useEffect(() => {
        highlightCurrentPhase();
    }, [phase]);
    
    useEffect(() => {
        checkAndAdvancePhase();
    }, [pickSelection, banSelection]);

    return {
        highlights,
        setHighlights,
        setPhase
    };
}