
import { createContext, useState } from 'react';
import { useAnimation, initialAnimationState } from '../hook/useAnimation';
import { useSwap, initialSwapStatus } from '../hook/useSwap';
import { usePhase } from '../hook/usePhase';
import { useHeroData } from '../hook/useHeroData';
import { usePick, initialPickSelectionState, initialPickInputState } from '../hook/usePick';
import { useBan, initialBanSelectionState, initialBanInputState } from '../hook/useBan';
import { useTeam, initialTeamSelectionState, initialTeamInputState } from '../hook/useTeam';
import { useTeamData } from '../hook/useTeamData';
import { usePlayer, initialPlayerInputState } from '../hook/usePlayer';
import { usePlayerData, initialplayerDataState } from '../hook/usePlayerData';
import { useResetPickandBan } from '../hook/useResetPickandBan';
import { useResetTeam } from '../hook/useResetTeam';
import { useSwitchTeam } from '../hook/useSwitchTeam';

const DraftContext = createContext();

export function DraftProvider({ children }) {
    const roundOption = [
    { id: "1", round: "Quarterfinals" },
    { id: "2", round: "Semifinals" },
    { id: "3", round: "Bronze Match" },
    { id: "4", round: "Grand Final" }
    ];

    const gameOption = [
        { id: "1", game: "MLBB" },
    ];

    const [rounds, setRounds] = useState(roundOption[0].round);
    const [games, setGame] = useState(gameOption[0].game);

    const { heroData } = useHeroData(games);
    const { teamInput, setTeamInput, handleTeamInputChange, teamSelection, setTeamSelection, handleTeamChange, handleWinCheckChange } = useTeam();
    const { teamData } = useTeamData(games);
    const { playerInputs, setPlayerInputs, handlePlayerInputsChange } = usePlayer();
    const { playerData, setPlayerData } = usePlayerData({ games, teamSelection });
    const { banSelection, setBanSelection, banInputs, setBanInputs, handleBan } = useBan();
    const { pickSelection, setPickSelection, pickInputs, setPickInputs, handlePick, handleShiftPick } = usePick(playerInputs);

    const {
        animationClasses,
        setAnimationClasses,
        handleAnimationFlyIn,
        handleAnimationFlyOut,
        handleAnimatedSelection
    } = useAnimation({
        pickSelection,
        handlePick,
        banSelection,
        handleBan
    });

    const { swapStatus, setSwapStatus, handleswapStatusChange } = useSwap({
        setPickSelection,
        setPickInputs,
        handleAnimationFlyIn,
        handleAnimationFlyOut
    });

    const { highlights, setHighlights, setPhase } = usePhase(banSelection, pickSelection);

    const{ resetPickandBan } = useResetPickandBan({
        setPickSelection, initialPickSelectionState,
        setPickInputs, initialPickInputState,
        setBanSelection, initialBanSelectionState,
        setBanInputs, initialBanInputState,
        setAnimationClasses, initialAnimationState,
        setPhase, setHighlights
    });

    const { resetTeam } = useResetTeam({
        setTeamInput, initialTeamInputState,
        setTeamSelection, initialTeamSelectionState,
        setPlayerInputs, initialPlayerInputState,
        setPlayerData, initialplayerDataState,
        setSwapStatus, initialSwapStatus
    });

    const { switchTeams } = useSwitchTeam({
        teamInput,
        teamSelection,
        playerInputs,
        playerData
    });

    return (
        <DraftContext.Provider value={{
            rounds, setRounds,
            games, setGame,
            heroData,
            teamInput, setTeamInput, handleTeamInputChange,
            teamSelection, setTeamSelection, handleTeamChange, handleWinCheckChange,
            teamData,
            playerInputs, setPlayerInputs, handlePlayerInputsChange,
            playerData, setPlayerData,
            banSelection, setBanSelection,
            banInputs, setBanInputs, handleBan,
            pickSelection, setPickSelection,
            pickInputs, setPickInputs, handlePick, handleShiftPick,
            animationClasses, setAnimationClasses,
            handleAnimationFlyIn, handleAnimationFlyOut, handleAnimatedSelection,
            swapStatus, setSwapStatus, handleswapStatusChange,
            highlights, setHighlights, setPhase,
            resetPickandBan,
            resetTeam,
            switchTeams
        }}>
            {children}
        </DraftContext.Provider>
    );
}