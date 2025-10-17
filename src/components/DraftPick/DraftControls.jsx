import DropdownSelector from "./DropdownSelector";

import { useGameContext } from "../../contexts/GameContext";
import { useDraftContext } from "../../contexts/DraftContext";

import { useResetPickandBan } from "../../hooks/useResetPickandBan";
import { useResetTeam } from "../../hooks/useResetTeam";
import { useSwitchTeam } from "../../hooks/useSwitchTeam";

export default function DraftControls() {
    const {
        roundOptions, selectedRound, setSelectedRound,
        BestOfOption, selectedBestOf, setSelectedBestOf,
        gameOptions, selectedGame, setSelectedGame,
        banOptions, selectedTotalBan, setSelectedTotalBan
    } = useGameContext();
    const {
        initialTeamInputState, setTeamInput,
        initialTeamSelectionState, setTeamSelection,
        setPlayerData,
        initialPlayerInputState, setPlayerInputs,
        initialBanSelectionState, setBanSelection,
        initialBanInputsState, setBanInputs,
        initialPickSelectionState, setPickSelection,
        initialPickInputsState, setPickInputs,
        initialAnimationState, setAnimationClasses, 
        initialSwapStatus, setSwapStatus,
        setHighlights, initialHighlights, setPhase, phase
    } = useDraftContext();
    
    const initialPlayerDataState = { blue: [], red: [] }
    
    const { resetPickandBan } = useResetPickandBan({
        setPickSelection, initialPickSelectionState,
        setPickInputs, initialPickInputsState,
        setBanSelection, initialBanSelectionState,
        setBanInputs, initialBanInputsState,
        setAnimationClasses, initialAnimationState,
        setHighlights, initialHighlights,
        setPhase, phase
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
        <div className="flex flex-col items-center gap-5">
            <div className="flex gap-3">
                <DropdownSelector
                    id="round-selector"
                    label="Select Round"
                    options={roundOptions}
                    selectedOption={selectedRound}
                    setSelectedOption={setSelectedRound}
                />
                <DropdownSelector
                    id="best-of-selector"
                    label="Select Best Of"
                    options={BestOfOption}
                    selectedOption={selectedBestOf}
                    setSelectedOption={setSelectedBestOf}
                />
                {/* <DropdownSelector
                    id="game-selector"
                    label="Select Game"
                    options={gameOptions}
                    selectedOption={selectedGame}
                    setSelectedOption={setSelectedGame}
                /> */}
                <DropdownSelector
                    id="ban-selector"
                    label="Select Total Ban"
                    options={banOptions}
                    selectedOption={selectedTotalBan}
                    setSelectedOption={setSelectedTotalBan}
                />
            </div>
            <div className="flex gap-3">
                <button className="w-30 hover:cursor-pointer" id="switch-team" onClick={switchTeam}>Switch Team</button>
                <button className="w-45 hover:cursor-pointer" id="reset-dropdowns" onClick={resetPickandBan}>Reset Pick and Ban</button>
                <button className="w-30 hover:cursor-pointer" id="reset-team" onClick={resetTeam}>Reset Team</button>
            </div>
        </div>
    );
}