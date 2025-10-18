export const useResetTeam = ({
    setTeamInput, initialTeamInputState,
    setTeamSelection, initialTeamSelectionState,
    setPlayerData, initialPlayerDataState,
    setPlayerInputs,  initialPlayerInputsState,
    setSwapStatus, initialSwapStatus,
}) => {
    const resetTeam = () => {
        setTeamInput(initialTeamInputState);
        setTeamSelection(initialTeamSelectionState);
        setPlayerData(initialPlayerDataState);
        setPlayerInputs(initialPlayerInputsState);
        setSwapStatus(initialSwapStatus);
    };

    return { resetTeam };
};