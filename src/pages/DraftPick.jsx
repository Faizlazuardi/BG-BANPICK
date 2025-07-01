import TeamDisplay from "/src/components/TeamDisplay";
import TeamField from "/src/components/TeamField";
import PlayerDisplay from "../components/PlayerDisplay";
import PlayerField from "/src/components/PlayerField";
import PickDisplay from "/src/components/PickDisplay";
import PickField from "/src/components/PickField";
import BanDisplay from "/src/components/BanDisplay";
import BanField from "/src/components/BanField";
import MatchSummary from "/src/components/MatchSummary";
import DropdownSelector from "../components/DropdownSelector";

import { useTeam } from "../hooks/useTeam";
import { usePlayer } from "../hooks/usePlayer";
import { useBan } from "../hooks/useBan";
import { usePick } from "../hooks/usePick";
import { useAnimation } from "../hooks/useAnimation";
import { useSwap } from "../hooks/useSwap";
import { usePhase } from "../hooks/usePhase";
import { usePlayerData } from "../hooks/usePlayerData";
import { useResetPickandBan } from "../hooks/useResetPickandBan";
import { useResetTeam } from "../hooks/useResetTeam";
import { useSwitchTeam } from "../hooks/useSwitchTeam";

import { useGameContext } from "../contexts/GameContext";

export default function DraftPick() {
    const { 
        roundOptions, selectedRound, setSelectedRound,
        BestOfOption, selectedBestOf, setSelectedBestOf,
        gameOptions, selectedGame, setSelectedGame,
    } = useGameContext()
    
    const { 
        initialTeamInputState, teamInput, setTeamInput, handleTeamInputChange, 
        initialTeamSelectionState, teamSelection, setTeamSelection, handleTeamChange, handleWinCheckChange
    } = useTeam();
    
    const initialPlayerDataState = {blue: [], red: [] }
    const { playerData, setPlayerData } = usePlayerData({selectedGame, teamSelection, initialPlayerDataState});
    const { initialPlayerInputState, playerInputs, setPlayerInputs, handlePlayerInputsChange } = usePlayer();
    
    const { 
        initialBanSelectionState, banSelection, setBanSelection, 
        initialBanInputState,banInputs, setBanInputs,
        handleBan
    } = useBan();
    const { 
        initialPickSelectionState, pickSelection, setPickSelection,
        initialPickInputState,pickInputs, setPickInputs,
        handlePick, handleShiftPick 
    } = usePick(playerInputs);
    
    const { 
        initialAnimationState,
        animationClasses,
        setAnimationClasses,
        handleAnimationFlyIn,
        handleAnimationFlyOut,
        handleAnimatedSelection
    } = useAnimation({
        pickSelection, handlePick,
        banSelection, handleBan
    });
    const { initialSwapStatus, swapStatus, setSwapStatus, handleswapStatusChange } = useSwap({
        setPickSelection, setPickInputs,
        handleAnimationFlyIn, handleAnimationFlyOut
    });
    const { highlights, setHighlights, initialHighlights, setPhase } = usePhase(banSelection, pickSelection);
    
    const{ resetPickandBan } = useResetPickandBan({
        setPickSelection, initialPickSelectionState,
        setPickInputs, initialPickInputState,
        setBanSelection, initialBanSelectionState,
        setBanInputs, initialBanInputState,
        setAnimationClasses, initialAnimationState,
        setHighlights, initialHighlights,
        setPhase,
    });
    const { resetTeam } = useResetTeam({
        setTeamInput, initialTeamInputState,
        setTeamSelection, initialTeamSelectionState,
        setPlayerData, initialPlayerDataState,
        setPlayerInputs, initialPlayerInputState,
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
                    <DropdownSelector
                        id="round-selector"
                        options={roundOptions}
                        selectedOption={selectedRound}
                        setSelectedOption={setSelectedRound}
                    />
                    <DropdownSelector
                        id="best-of-selector"
                        options={BestOfOption}
                        selectedOption={selectedBestOf}
                        setSelectedOption={setSelectedBestOf}
                    />
                    <DropdownSelector
                        id="game-selector"
                        options={gameOptions}
                        selectedOption={selectedGame}
                        setSelectedOption={setSelectedGame}
                    />
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
                    teamInputs={teamInput}
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
