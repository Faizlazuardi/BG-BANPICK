import { useRef } from "react";

import { useGameContext } from "../../../contexts/GameContext";
import { useDraftContext } from "../../../contexts/DraftContext";

import { useTeamData } from "../../../hooks/useTeamData";

export default function TeamField() {
    const { selectedGame, requiredWins } = useGameContext()
    const {
        handleTeamChange: onTeamNameChange, handleWinCheckChange: onWinCheckChange, handleTeamInputChange: onTeamInputChange,
        teamSelection,
        teamInput: teamInputs,
    } = useDraftContext()

    const { teamData } = useTeamData(selectedGame);
    const { blue: blueTeamInput, red: redTeamInput } = teamInputs;

    const inputRefs = useRef({ red: null, blue: null });

    const renderTeamField = ({ teamSide, teamInput }) => {
        return (
            <div className="flex flex-col gap-20" key={teamSide}>
                <div className="flex flex-col gap-5">
                    <h2 className="font-bold text-lg text-center">{`${teamSide} Team`}</h2>
                    <div className="">
                        <input
                            ref={(elem) => inputRefs.current[teamSide] = elem}
                            id={`team-${teamSide.toLowerCase()}-input`}
                            className="peer rounded-md w-36.5"
                            type="text"
                            placeholder="Enter Team Name"
                            value={teamInput}
                            onChange={(e) => onTeamInputChange(teamSide.toLowerCase(), e.target.value)}
                        />
                        <div className="invisible absolute bg-white w-36.5 max-h-15 overflow-y-auto peer-focus:visible">
                            {teamData
                                .filter(team => team.Name.toLowerCase().startsWith(teamInput.toLowerCase()))
                                .map(team => (
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                                        key={team.Name}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            onTeamNameChange(teamSide.toLowerCase(), { name: team.Name, logo: team.Logo });
                                            onTeamInputChange(teamSide.toLowerCase(), team.Name);
                                            inputRefs.current[teamSide].blur();
                                        }}
                                    >
                                        {team.Name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="font-bold text-lg text-center">Win Check</h2>
                    <div className="flex justify-center gap-3">
                        {Array.from({ length: requiredWins }).map((_, index) => (
                            <label key={index} className="flex flex-col justify-center text-center">
                                <input
                                    className="w-5 h-5"
                                    id={`${teamSide.toLowerCase()}-win-check-${index + 1}`}
                                    type="checkbox"
                                    checked={teamSelection[teamSide.toLowerCase()].WinCheck[index] || false}
                                    onChange={() => onWinCheckChange(teamSide.toLowerCase(), index)}
                                />
                                {index + 1}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderTeamField({ teamSide: "Blue", teamInput: blueTeamInput })}
            {renderTeamField({ teamSide: "Red", teamInput: redTeamInput })}
        </>
    );
}
