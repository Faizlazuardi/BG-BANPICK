import { useRef } from "react";
import { TEAM_SIZE } from "../../../constants/gameConstant";
import { createTeamArray } from "../../../utils/arrayUtils";

import { useDraftContext } from "../../../contexts/DraftContext";

export default function PlayerField() {
    const { playerInputs, playerData, handlePlayerInputsChange } = useDraftContext()
    const { blue: bluePlayerInputs, red: redPlayerInputs } = playerInputs;
    const { blue: bluePlayers, red: redPlayers } = playerData;
    const onPlayerChange = (team, id, value) => handlePlayerInputsChange("playerInput", team, id, value)
    const inputRefs = useRef(createTeamArray(TEAM_SIZE, ""));
    
    const renderPlayerField = ({ teamSide, playerInput, playerList }) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => (
            <div key={index}>
                <input
                    ref={(elem) => (inputRefs.current[teamSide.toLowerCase()][index] = elem)}
                    id={`Player-${teamSide}-${index + 1}`}
                    className="peer rounded-md w-36.5"
                    type="text"
                    placeholder={`${teamSide} Side Player ${index + 1}`}
                    maxLength="12"
                    value={playerInput[index]}
                    onChange={(e) => onPlayerChange(teamSide.toLowerCase(), index, e.target.value)}
                />
                <div className="invisible absolute bg-white w-36.5 max-h-20 overflow-y-auto peer-focus:visible">
                    {playerList.length > 0 && playerList
                        .filter(player => player.Name.toLowerCase().startsWith(playerInput[index].toLowerCase()))
                        .map(player => (
                            <div className="flex items-center gap-2 hover:bg-gray-100 p-2 h-10 cursor-pointer"
                                key={player.Id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    onPlayerChange(teamSide.toLowerCase(), index, player.Name);
                                    inputRefs.current[teamSide.toLowerCase()][index].blur();
                                }}
                            >
                                {player.Name}
                            </div>
                        ))
                    }
                </div>
            </div>
        ));
    };

    return (
        <>
            <div className="flex flex-col gap-5">
                <h1 className="font-bold text-lg text-center">Blue Player</h1>
                {renderPlayerField({ teamSide: "Blue", playerInput: bluePlayerInputs, playerList: bluePlayers })}
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="font-bold text-lg text-center">Red Player</h1>
                {renderPlayerField({ teamSide: "Red", playerInput: redPlayerInputs, playerList: redPlayers })}
            </div>
        </>
    );
}