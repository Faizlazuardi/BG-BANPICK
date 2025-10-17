import { useRef, useState } from 'react';
import { useGameContext } from "../../contexts/GameContext";
import { getTeamById } from '../../services/api';

export default function PlayerField({ value, onInputChange, action, teamData }) {
    const { selectedGame } = useGameContext()
    const [previewFotoUrl, setPreviewFotoUrl] = useState(value.Foto || null)
    
    const handleFotoChange = (file) => {
        const Url = URL.createObjectURL(file);
        setPreviewFotoUrl(Url);
        onInputChange("Foto", file)
    }
    const inputRefs = useRef();
    return(
        <>
            { action !== "Add" && (
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
                                            getTeamById(selectedGame, Team.Id)
                                                .then((team) => {
                                                    onInputChange("Team", { Id: team.Id, Name: team.Name }
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
                <img className="w-15 h-fit" src={previewFotoUrl} alt="" />
                <input type="file" id="player-photo-input"
                    onChange={(e) => { handleFotoChange(e.target.files[0]) }}
                />
            </label>
        </>
    )
}