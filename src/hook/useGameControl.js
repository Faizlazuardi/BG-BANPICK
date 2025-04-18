// hooks/useGameControl.js
export const useGameControl = ({
    setPickSelection, initialPickSelectionState,
    setPickInputs, initialPickInputState,
    setBanSelection, initialBanSelectionState,
    setBanInputs, initialBanInputState,
    setAnimationClasses, initialAnimationState,
    setTeamInputs, initialTeamInputState,
    setTeamSelection, initialTeamSelectionState,
    setPlayerInputs,  initialPlayerInputState,
    setPlayerData, initialplayerDataState,
    setSwapStatus, initialSwapStatus
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
        }, 1200);
        return () => clearTimeout(flyOutTimeout);
    };
    
    const resetTeam = () => {
        setTeamInputs(initialTeamInputState);
        setTeamSelection(initialTeamSelectionState);
        setPlayerInputs(initialPlayerInputState);
        setPlayerData(initialplayerDataState);
        setSwapStatus(initialSwapStatus);
    };
    
    const switchTeam = () => {
        setPlayerInputs(prev => ({ blue: prev.red, red: prev.blue }));
        setTeamSelection(prev => ({ blue: prev.red, red: prev.blue }));
    };
    
    return {
        resetPickandBan,
        resetTeam,
        switchTeam,
    };
};