export const useResetTeam = ({
    setTeamInput, initialTeamInputState,
    setTeamSelection, initialTeamSelectionState,
    setPlayerData, initialPlayerDataState,
    setPlayerInputs,  initialPlayerInputState,
    setSwapStatus, initialSwapStatus,
}) => {
    const resetTeam = () => {
        setTeamInput(initialTeamInputState);
        setTeamSelection(initialTeamSelectionState);
        setPlayerData(initialPlayerDataState);
        setPlayerInputs(initialPlayerInputState);
        setSwapStatus(initialSwapStatus);
    };

    return { resetTeam };
};