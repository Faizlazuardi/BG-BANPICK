import { useRef } from 'react';

import { useTeamData } from "../hooks/useTeamData";

import { getTeamById } from '../services/api';

function PlayerField({ value, onInputChange, action, game, teamData }) {
    if (!value) return null;
    
    const inputRefs = useRef();

    return(
        <>
            { action !== "Add" &&(
                <>
                    <h1 className="font-2xl text-bold text-gray-600">Player Team</h1>
                    <div>
                        <input
                            ref={(elem) => (inputRefs.current = elem)}
                            id="player-team-input"
                            className="peer"
                            type="text"
                            placeholder="Enter Player Team Name"
                            value={value.Team.Name} 
                            onChange={
                                (e) => {onInputChange("Team", {Name: e.target.value})}
                            }
                        />
                        <div className="invisible absolute bg-white w-36.5 max-h-20 overflow-y-auto peer-focus:visible">
                            {teamData
                                .filter(Team => Team.Name.toLowerCase().startsWith(value.Team.Name.toLowerCase()))
                                .map(Team => (
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                                        key={Team.Id}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            console.log(Team.Id)
                                            getTeamById(game, Team.Id)
                                            .then((team) => {
                                                onInputChange("Team", { Id: team.Id, Name: team.Name}
                                                );
                                            })
                                            inputRefs.current.blur();
                                        }}
                                    >
                                        {Team.Name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </>
            )}
            <label className="flex flex-col font-2xl text-bold text-gray-600 text-center">
                Player Name
                <input type="text" id="player-name-input" placeholder="Enter Player Name" value={value.Name} onChange={(e) => onInputChange("Name", e.target.value)}/>
            </label>
            <label className="flex flex-col font-2xl text-bold text-gray-600 text-center">
                Player Photo
                <img className="w-15 h-fit" src={value.Foto} alt="" />
                <input type="file" id="player-photo-input" onChange={(e) => onInputChange("Foto", e.target.files[0])}/>
            </label>
        </>
    )
}

function TeamField({ value, onInputChange }){
    if (!value) return null;
    return(
        <>
            <label className="flex flex-col font-2xl text-bold text-gray-600 text-center">
                Team Name
                <input type="text" id="team-name-imput" value={value.Name} onChange={(e) => onInputChange("Name", e.target.value)}/>
            </label>
            <label className="flex flex-col font-2xl text-bold text-gray-600 text-center">
                Team Logo
                <img className="w-15 h-fit" src={value.Logo} alt="" />
                <input type="file" id="team-logo-input" onChange={(e) => onInputChange("Logo", e.target.files[0])}/>
            </label>
        </>
    )
}

export default function FormModal({ action, type, isOpen, onClose, onUpdate, onInputChange, value, game }) {
    const { teamData } = useTeamData(game);
    
    if (!isOpen) return null;
    
    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900/50">
            <div className="flex flex-col items-center gap-6 bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
                <h2 className="text-5xl">
                    { action }{" "}
                    { type !== "Team" && value?.Team.Name }{" "}
                    {
                        action === "Add" ? "New" : 
                        action === "Edit" ? value?.Name : null
                    }{" "}
                    { !(action === "Edit" && type === "Player") && type }
                </h2>
                {
                    type === 'Player' ? ( <PlayerField value={value} onInputChange={onInputChange} action={action} game={game} teamData={teamData}/> ) : 
                    type === 'Team' ? ( <TeamField value={value} onInputChange={onInputChange} />) : 
                    null
                }
                <div className="flex justify-end gap-4">
                    <button
                        className="bg-white hover:bg-gray-200 px-4 py-2 border-gray-400 rounded text-gray-800"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                        onClick={() =>
                            onUpdate(game, value.Id, value)
                            .then(() => {
                                onClose();
                                window.location.reload();
                            })
                        }
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}