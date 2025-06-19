import { useState } from "react";

// Components
import TeamDisplay from "/src/components/TeamDisplay";
import TeamField from "/src/components/TeamField";
import PlayerDisplay from "../components/PlayerDisplay";
import PlayerField from "/src/components/PlayerField";
import PickDisplay from "/src/components/PickDisplay";
import PickField from "/src/components/PickField";
import BanDisplay from "/src/components/BanDisplay";
import BanField from "/src/components/BanField";
import MatchSummary from "/src/components/MatchSummary";

// Hooks & Initial States
import { useAnimation, initialAnimationState } from "../hook/useAnimation";
import { useSwap, initialSwapStatus } from "../hook/useSwap";
import { usePhase } from "../hook/usePhase";
import { usePick, initialPickSelectionState, initialPickInputState } from "../hook/usePick";
import { useBan, initialBanSelectionState, initialBanInputState } from "../hook/useBan";
import { useTeam, initialTeamSelectionState, initialTeamInputState } from "../hook/useTeam";
import { usePlayer, initialPlayerInputState } from "../hook/usePlayer";
import { usePlayerData } from "../hook/usePlayerData";
import { useResetPickandBan } from "../hook/useResetPickandBan";
import { useResetTeam } from "../hook/useResetTeam";
import { useSwitchTeam } from "../hook/useSwitchTeam";

import { useGameContext } from "../contexts/GameContext";

export default function DraftPick() {
    const { roundOptions, selectedRound, setSelectedRound, gameOptions, selectedGame, setSelectedGame } = useGameContext()

    const initialPlayerDataState = {blue: [], red: [] }

    const { teamInput, setTeamInput, handleTeamInputChange, teamSelection, setTeamSelection, handleTeamChange, handleWinCheckChange } = useTeam();
    const { playerData, setPlayerData } = usePlayerData({selectedGame, teamSelection, initialPlayerDataState});
    const { playerInputs, setPlayerInputs, handlePlayerInputsChange } = usePlayer();
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
        setPlayerData, initialPlayerDataState,
        setSwapStatus, initialSwapStatus
    });
    const { switchTeam } = useSwitchTeam({ setTeamInput, setTeamSelection, setPlayerInputs });

    return (
        <main className="flex flex-col flex-grow items-center gap-10 mt-10">
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
                <PlayerDisplay
                    grid={{ gridBlue: "col-span-2 col-start-1 row-start-3", gridRed:"col-span-2 col-start-4 row-start-3" }}
                    playerInputs={playerInputs}
                    highlights={highlights}
                />
                <MatchSummary
                    grid="col-start-3 row-span-3 row-start-1"
                    round={selectedRound}
                    teamInput={teamSelection}
                />
            </div>

            <div className="flex flex-col items-center gap-5">
                <div className="flex gap-3">
                    <select id="round" className="p-2 border-2 w-35 h-11 text-center" value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)}>
                        {roundOptions.map(({ id, round }) => (
                            <option value={round} key={id}>{round}</option>
                        ))}
                    </select>
                    <select id="selectedGame" className="p-2 border-2 w-35 h-11 text-center" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
                            {gameOptions.map(({ id, game }) => (
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

            <div className="flex gap-9">
                <TeamField
                    onTeamChange={{
                        onTeamNameChange: handleTeamChange,
                        onWinCheckChange: handleWinCheckChange
                    }}
                    teamSelection={teamSelection}
                    teamInput={teamInput}
                    onTeamInputChange={handleTeamInputChange}
                />
                <PlayerField
                    onPlayerChange={(team, id, value) => handlePlayerInputsChange("playerInput", team, id, value)}
                    playerInputs={playerInputs}
                    playerData={playerData}
                />
                <BanField
                    onBanSelectionChange={(team, id, hero) => handleAnimatedSelection('ban', team, id, hero)}
                    onBanInputChange={(team, id, hero) => handleBan("banInput", team, id, hero)}
                    banInputs={banInputs}
                />
                <PickField
                    onPickSelectionChange={(team, id, hero) => handleAnimatedSelection('pick', team, id, hero)}
                    onPickInputChange={(team, id, hero) => handlePick("pickInput", team, id, hero)}
                    pickInputs={pickInputs}
                    onShiftPick={handleShiftPick}
                    swapStatus={swapStatus}
                    onSwapStatusChange={handleswapStatusChange}
                />
            </div>
        </main>
    );
}
