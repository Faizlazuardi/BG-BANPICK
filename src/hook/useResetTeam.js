export const useResetTeam = ({
    setTeamInput, initialTeamInputState,
    setTeamSelection, initialTeamSelectionState,
    setPlayerInputs,  initialPlayerInputState,
    setPlayerData, initialPlayerDataState,
    setSwapStatus, initialSwapStatus,
}) => {
    const resetTeam = () => {
        setTeamInput(initialTeamInputState);
        setTeamSelection(initialTeamSelectionState);
        setPlayerInputs(initialPlayerInputState);
        setPlayerData(initialPlayerDataState);
        setSwapStatus(initialSwapStatus);
    };

    return { resetTeam };
};