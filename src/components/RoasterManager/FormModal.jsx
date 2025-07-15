import { useTeamData } from "../../hooks/useTeamData";

import TeamField from './TeamField';
import PlayerField from './PlayerField';

export default function FormModal({ action, type, isOpen, onClose, onAction, onInputChange, value, game }) {
    if (!isOpen) return null;
    const { teamData } = useTeamData(game);
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
                    type === 'Team' ? ( <TeamField value={value} onInputChange={onInputChange} />) : 
                    type === 'Player' ? ( <PlayerField value={value} onInputChange={onInputChange} action={action} game={game} teamData={teamData}/> ) : 
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
                        onClick={async () =>{
                            const data = await (action === "Edit" ? onAction(game, value, value.Id) : onAction(game, value))
                            console.log(value)
                            console.log(data)
                            onClose();
                            // window.location.reload();
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}