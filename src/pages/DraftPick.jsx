import { useState } from "react";

// Components
import TeamDisplay from "/src/components/TeamDisplay";
import BanDisplay from "/src/components/BanDisplay";
import PickDisplay from "/src/components/PickDisplay";
import MatchSummary from "/src/components/MatchSummary";
import TeamField from "/src/components/TeamField";
import BanField from "/src/components/BanField";
import PickField from "/src/components/PickField";
import PlayerField from "/src/components/PlayerField";

// Hooks & Initial States
import { useAnimation, initialAnimationState } from "../hook/useAnimation";
import { useSwap, initialSwapStatus } from "../hook/useSwap";
import { usePhase } from "../hook/usePhase";
import { useHeroData } from "../hook/useHeroData";
import { usePick, initialPickSelectionState, initialPickInputState } from "../hook/usePick";
import { useBan, initialBanSelectionState, initialBanInputState } from "../hook/useBan";
import { useTeam, initialTeamSelectionState, initialTeamInputState } from "../hook/useTeam";
import { useTeamData } from "../hook/useTeamData";
import { usePlayer, initialPlayerInputState } from "../hook/usePlayer";
import { usePlayerData, initialplayerDataState } from "../hook/usePlayerData";
import { useResetPickandBan } from "../hook/useResetPickandBan";
import { useResetTeam } from "../hook/useResetTeam";
import { useSwitchTeam } from "../hook/useSwitchTeam";

// Constants
const roundOption = [
    { id: "1", round: "Quarterfinals" },
    { id: "2", round: "Semifinals" },
    { id: "3", round: "Bronze Match" },
    { id: "4", round: "Grand Final" }
];

const gameOption = [
    { id: "1", game: "MLBB" },
    { id: "2", game: "HOK" }
];

export default function DraftPick() {
    const [rounds, setRounds] = useState(roundOption[0].round);
    const [games, setGame] = useState(gameOption[0].game);

    // Hooks
    const { heroData } = useHeroData(games);
    const { teamInput, setTeamInput, handleTeamInputChange, teamSelection, setTeamSelection, handleTeamChange, handleWinCheckChange } = useTeam();
    const { teamData } = useTeamData(games);
    const { playerInputs, setPlayerInputs, handlePlayerInputsChange } = usePlayer();
    const { playerData, setPlayerData } = usePlayerData({games, teamSelection});
    const { banSelection, setBanSelection, banInputs, setBanInputs, handleBan } = useBan();
    const { pickSelection, setPickSelection, pickInputs, setPickInputs, handlePick, handleShiftPick } = usePick(playerInputs);

    const { 
        animationClasses,
        setAnimationClasses,
        handleAnimationFlyIn,
        handleAnimationFlyOut,
        handleAnimatedSelection
    } = useAnimation({
        pickSelection, handlePick,
        banSelection, handleBan
    });
    const { swapStatus, setSwapStatus, handleswapStatusChange } = useSwap({
        setPickSelection, setPickInputs,
        handleAnimationFlyIn, handleAnimationFlyOut
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
    const { switchTeam } = useSwitchTeam({ setPlayerInputs, setTeamSelection, setTeamInput });

    return (
        <main className="flex flex-col flex-grow items-center gap-10 mt-10">
            {/* Match Display Section */}
            <div className="grid grid-cols-[auto] grid-rows-[auto]">
                <TeamDisplay
                    grid={{ gridBlue: "col-start-1 row-start-1", gridRed: "col-start-5 row-start-1" }}
                    teams={{ blue: teamSelection.blue.Name, red: teamSelection.red.Name }}
                />
                <BanDisplay
                    grid={{ gridBlue: "col-start-2 row-start-1", gridRed: "col-start-4 row-start-1" }}
                    bans={banSelection}
                    animationClasses={animationClasses.ban}
                />
                <PickDisplay
                    grid={{ gridBlue: "col-span-2 col-start-1 row-start-2", gridRed: "col-span-2 col-start-4 row-start-2" }}
                    playerInputs={playerInputs}
                    picks={pickSelection}
                    animationClasses={animationClasses.pick}
                    highlights={highlights}
                />
                <MatchSummary
                    grid="col-start-3 row-span-2 row-start-1"
                    round={rounds}
                    teamInput={teamSelection}
                />
            </div>

            {/* Controls Section */}
            <div className="flex flex-col items-center gap-5">
                <div className="flex gap-3">
                    <select id="round" className="p-2 border-2 w-35 h-11 text-center" onChange={(e) => setRounds(e.target.value)}>
                        {roundOption.map(({ id, round }) => (
                            <option value={round} key={id}>{round}</option>
                        ))}
                    </select>
                    <select id="Games" className="p-2 border-2 w-35 h-11 text-center" onChange={(e) => setGame(e.target.value)}>
                            {gameOption.map(({ id, game }) => (
                                <option value={game} key={id}>{game}</option>
                            ))}
                    </select>
                </div>
                <div className="flex gap-3">
                    <button className="w-30" id="switch-team" onClick={switchTeam}>Switch Team</button>
                    <button className="w-45" id="reset-dropdowns" onClick={resetPickandBan}>Reset Pick and Ban</button>
                    <button className="w-30" id="reset-team" onClick={resetTeam}>Reset Team</button>
                </div>
            </div>

            {/* Fields Section */}
            <div className="flex gap-9">
                <TeamField
                    onTeamChange={{
                        onTeamNameChange: handleTeamChange,
                        onWinCheckChange: handleWinCheckChange
                    }}
                    teamSelection={teamSelection}
                    teamInput={teamInput}
                    onTeamInputChange={handleTeamInputChange}
                    teams={teamData}
                />
                <PlayerField
                    onPlayerChange={(team, id, value) => handlePlayerInputsChange("playerInput", team, id, value)}
                    playerInputs={playerInputs}
                    players={playerData}
                />
                <BanField
                    onBanSelectionChange={(team, id, hero) => handleAnimatedSelection('ban', team, id, hero)}
                    onBanInputChange={(team, id, hero) => handleBan("banInput", team, id, hero)}
                    banInputs={banInputs}
                    heroes={heroData}
                />
                <PickField
                    onPickSelectionChange={(team, id, hero) => handleAnimatedSelection('pick', team, id, hero)}
                    onPickInputChange={(team, id, hero) => handlePick("pickInput", team, id, hero)}
                    pickInputs={pickInputs}
                    heroes={heroData}
                    onShiftPick={handleShiftPick}
                    swapStatus={swapStatus}
                    onSwapStatusChange={handleswapStatusChange}
                />
            </div>
        </main>
    );
}
