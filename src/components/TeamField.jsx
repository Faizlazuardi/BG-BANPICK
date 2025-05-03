import { useRef } from "react";

export default function TeamField({ onTeamChange, teamSelection, teamInput, onTeamInputChange, teams }) {
    const { onTeamNameChange, onWinCheckChange } = onTeamChange;
    const { blue: blueTeamInput, red: redTeamInput } = teamInput;
    const inputRefs = useRef({});

    const renderTeamField = ({ teamSide, id, teamInput }) => {
        return (
            <div className="flex flex-col gap-20" key={id}>
                <div className="flex flex-col gap-5">
                    <h2 className="font-bold text-lg text-center">{`${teamSide} Team`}</h2>
                    <div className="">
                        <input
                            ref={(elem) => inputRefs.current[id] = elem}
                            id={`team-${id}`}
                            className="peer rounded-md"
                            type="text"
                            placeholder="Enter Team Name"
                            value={teamInput}
                            onChange={(e) => onTeamInputChange(teamSide.toLowerCase(), e.target.value)}
                        />
                        <div id={`dropdown-team-${teamSide.toLowerCase()}`} className="invisible absolute bg-white w-36.5 max-h-15 overflow-y-auto peer-focus:visible">
                            {teams
                                .filter(team => team.Name.toLowerCase().startsWith(teamInput.toLowerCase()))
                                .map(team => (
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                                        key={team.Name}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            onTeamNameChange(teamSide.toLowerCase(), {name:team.Name, logo:team.Logo});
                                            onTeamInputChange(teamSide.toLowerCase(), team.Name);
                                            inputRefs.current[id].blur();
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
                        {[1, 2, 3].map((index) => (
                            <label key={index} className="flex flex-col justify-center text-center">
                                <input
                                    className="w-5 h-5"
                                    id={`win-check-${id * 3 - (3 - index)}`}
                                    type="checkbox"
                                    checked={teamSelection[teamSide.toLowerCase()].WinCheck[index - 1] || false}
                                    onChange={() => onWinCheckChange(teamSide.toLowerCase(), index - 1)}
                                />
                                {index}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderTeamField({ teamSide: "Blue", id: 1, teamInput: blueTeamInput })}
            {renderTeamField({ teamSide: "Red", id: 2, teamInput: redTeamInput })}
        </>
    );
}
