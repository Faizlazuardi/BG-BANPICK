import { useRef } from 'react';

import { useTeamData } from "../hooks/useTeamData";

import { getTeamById } from '../services/api';

function PlayerField({ value, onInputChange, game, teamData }) {
    if (!value) return null;
    
    const inputRefs = useRef();
    
    return(
        <>
            <h1 className="font-2xl text-bold text-gray-600">Player Team</h1>
            <div>
                <input
                    ref={(elem) => (inputRefs.current = elem)}
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
                                    getTeamById(game, Team.Id)
                                    .then((team) => {
                                        onInputChange("Team", {
                                            Id: team.Id,
                                            Name: team.Name,
                                        });
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
            <label className="font-2xl text-bold text-gray-600">Player Name</label>
            <input type="text" name="" id="" placeholder="Enter Player Name" value={value.Name} onChange={(e) => onInputChange("Name", e.target.value)}/>
            <label className="font-2xl text-bold text-gray-600">Player Photo</label>
            <img className="w-15 h-fit" src={value.Foto} alt="" />
            <input type="file" name="" id="" onChange={(e) => onInputChange("Foto", e.target.files[0])}/>
        </>
    )
}

function TeamField({ value, onInputChange }){
    if (!value) return null;
    return(
        <>
            <label className="font-2xl text-bold text-gray-600">Team Name</label>
            <input type="text" name="" id="" value={value.Name} onChange={(e) => onInputChange("Name", e.target.value)}/>
            <label className="font-2xl text-bold text-gray-600">Team Logo</label>
            <img className="w-15 h-fit" src={value.Logo} alt="" />
            <input type="file" name="" id="" onChange={(e) => onInputChange("Logo", e.target.files[0])}/>
        </>
    )
}

export default function UpdateModal({ type, isOpen, onClose, onUpdate, onInputChange, value, game }) {
    const { teamData } = useTeamData(game);
    
    if (!isOpen) return null;
    
    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900/50">
            <div className="flex flex-col items-center gap-6 bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
                <h2 className="text-5xl">Update {type}</h2>
                {
                    type === 'Player' ? ( <PlayerField value={value} onInputChange={onInputChange} game={game} teamData={teamData}/> ) : 
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