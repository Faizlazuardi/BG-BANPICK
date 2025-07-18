import { TEAM_SIZE, TIMEOUT_DURATION } from "../constants/gameConstant";

export const useResetPickandBan = ({
    setPickSelection, initialPickSelectionState,
    setPickInputs, initialPickInputsState,
    setBanSelection, initialBanSelectionState,
    setBanInputs, initialBanInputsState,
    setAnimationClasses, initialAnimationState,
    setHighlights, initialHighlights,
    setPhase, phase
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
            setPickInputs(initialPickInputsState);
            setBanSelection(initialBanSelectionState);
            setBanInputs(initialBanInputsState);
            setAnimationClasses(initialAnimationState);
            if (phase !== 0) {
                setHighlights(initialHighlights);
                setPhase(0);
            }
        }, TIMEOUT_DURATION);
        return () => clearTimeout(flyOutTimeout);
    };

    return { resetPickandBan };
};