const TEAM_SIZE = 5;
const TIMEOUT_DURATION = 1200;

export const useResetPickandBan = ({
    setPickSelection, initialPickSelectionState,
    setPickInputs, initialPickInputState,
    setBanSelection, initialBanSelectionState,
    setBanInputs, initialBanInputState,
    setAnimationClasses, initialAnimationState,
    setHighlights, initialHighlights,
    setPhase
}) => {
    const resetPickandBan = () => {
        setAnimationClasses(prev => ({
            pick: Object.fromEntries(
                Object.keys(prev.pick).map(team => [team, Array(TEAM_SIZE).fill("fly-out")])
            ),
            ban: Object.fromEntries(
                Object.keys(prev.ban).map(team => [team, Array(TEAM_SIZE).fill("fly-out")])
            )
        }));
        
        const flyOutTimeout = setTimeout(() => {
            setPickSelection(initialPickSelectionState);
            setPickInputs(initialPickInputState);
            setBanSelection(initialBanSelectionState);
            setBanInputs(initialBanInputState);
            setAnimationClasses(initialAnimationState);
            setHighlights(initialHighlights);
            setPhase(0);
        }, TIMEOUT_DURATION);
        return () => clearTimeout(flyOutTimeout);
    };
    
    return { resetPickandBan };
};