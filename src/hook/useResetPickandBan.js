export const useResetPickandBan = ({
    setPickSelection, initialPickSelectionState,
    setPickInputs, initialPickInputState,
    setBanSelection, initialBanSelectionState,
    setBanInputs, initialBanInputState,
    setAnimationClasses, initialAnimationState,
    setPhase, setHighlights
}) => {
    const resetPickandBan = () => {
        setAnimationClasses(prev => {
            const updated = { ...prev };
            for (const team in prev.pick) {
                updated.pick[team] = Array(5).fill("fly-out");
            }
            for (const team in prev.ban) {
                updated.ban[team] = Array(5).fill("fly-out");
            }
            return updated;
        });
        
        const flyOutTimeout = setTimeout(() => {
            setPickSelection(initialPickSelectionState);
            setPickInputs(initialPickInputState);
            setBanSelection(initialBanSelectionState);
            setBanInputs(initialBanInputState);
            setAnimationClasses(initialAnimationState);
            setPhase(0);
            setHighlights({ blue: Array(5).fill(false), red: Array(5).fill(false) });
        }, 1200);
        return () => clearTimeout(flyOutTimeout);
    };
    
    return {
        resetPickandBan,
    };
};