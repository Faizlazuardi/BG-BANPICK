export const useResetTeam = ({
    setTeamInputs, initialTeamInputState,
    setTeamSelection, initialTeamSelectionState,
    setPlayerInputs,  initialPlayerInputState,
    setPlayerData, initialplayerDataState,
    setSwapStatus, initialSwapStatus,
}) => {
    const resetTeam = () => {
        setTeamInputs(initialTeamInputState);
        setTeamSelection(initialTeamSelectionState);
        setPlayerInputs(initialPlayerInputState);
        setPlayerData(initialplayerDataState);
        setSwapStatus(initialSwapStatus);
    };

    return { resetTeam };
};