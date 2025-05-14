export const useResetTeam = ({
    setTeamInput, initialTeamInputState,
    setTeamSelection, initialTeamSelectionState,
    setPlayerInputs,  initialPlayerInputState,
    setPlayerData, initialplayerDataState,
    setSwapStatus, initialSwapStatus,
}) => {
    const resetTeam = () => {
        setTeamInput(initialTeamInputState);
        setTeamSelection(initialTeamSelectionState);
        setPlayerInputs(initialPlayerInputState);
        setPlayerData(initialplayerDataState);
        setSwapStatus(initialSwapStatus);
    };

    return { resetTeam };
};