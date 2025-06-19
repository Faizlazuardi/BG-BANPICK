import { useRef } from "react";

export default function PlayerField({ onPlayerChange, playerInputs, playerData }) {
    const { blue: bluePlayerInputs, red: redPlayerInputs } = playerInputs;
    const { blue: bluePlayers, red: redPlayers } = playerData;
    const playerBlueIds = [1, 2, 3, 4, 5];
    const playerRedIds = [6, 7, 8, 9, 10];
    const inputRefs = useRef({});

    const renderPlayerField = ({ team, ids, playerInput, availablePlayer }) => {
        return ids.map((id) => (
            <div key={id}>
                <input
                    ref={(elem) => (inputRefs.current[id] = elem)}
                    id={`Player-${team}-${id}`}
                    className="peer rounded-md"
                    type="text"
                    placeholder={`${team} Side Player ${(id - 1) % 5 + 1}`}
                    maxLength="12"
                    value={playerInput[(id - 1) % 5]}
                    onChange={(e) => onPlayerChange(team.toLowerCase(), (id - 1) % 5, e.target.value)}
                />
                <div id={`dropdown-Player-${team}-${id}`} className="invisible absolute bg-white w-36.5 max-h-15 overflow-y-auto peer-focus:visible">
                    {availablePlayer?.length > 0 && availablePlayer
                        .filter(player => player.Username.toLowerCase().startsWith(playerInput[(id - 1) % 5].toLowerCase()))
                        .map(player => (
                            <div className="flex items-center gap-2 hover:bg-gray-100 h-8"
                                key={player.Id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    onPlayerChange(team.toLowerCase(), (id - 1) % 5, player.Username);
                                    inputRefs.current[id].blur();
                                }}
                            >
                                {player.Username}
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
                {renderPlayerField({ team: "Blue", ids: playerBlueIds, playerInput: bluePlayerInputs, availablePlayer: bluePlayers })}
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="font-bold text-lg text-center">Red Player</h1>
                {renderPlayerField({ team: "Red", ids: playerRedIds, playerInput: redPlayerInputs, availablePlayer: redPlayers })}
            </div>
        </>
    );
}