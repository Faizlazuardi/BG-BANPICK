import { useState } from 'react';

import { X, SquarePen, Trash2 } from 'lucide-react';

import FormModal from './FormModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

import { usePlayerData } from "../../hooks/usePlayerData";

import { useGameContext } from "../../contexts/GameContext";

import { getPlayerById, addPlayers, updatePlayers, deletePlayers } from '../../services/api'

export default function PlayerList({ teamSelection }) {
    const { selectedGame } = useGameContext()

    const [playerValue, setPlayerValue] = useState({ Name: "", Foto: null, Team: { Id: teamSelection.single.Id, Name: teamSelection.single.Name } });

    const handlePlayerValueChange = (Field, value) => {
        setPlayerValue((prev) => {
            if (Field === "Team") {
                return {
                    ...prev,
                    Team: {
                        ...prev.Team,
                        Id: value.Id,
                        Name: value.Name,
                    },
                };
            } else {
                return {
                    ...prev,
                    [Field]: value,
                };
            }
        });
    };

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
    }

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
    };

    const [deletedValue, setDeletedValue] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const handledeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };

    const initialPlayerDataState = {
        single: []
    };
    const { playerData } = usePlayerData({ selectedGame, teamSelection, initialPlayerDataState });

    return (
        <div className="flex flex-col gap-5 mt-5 max-w-3xl text-cyan-950">
            <h2 className="text-5xl text-center">{teamSelection.single.Name} Player List</h2>
            <button
                className="flex items-center gap-2 bg-green-500 hover:bg-green-800 px-3 py-1 rounded w-32 font-semibold text-white text-sm"
                onClick={() => { setIsAddModalOpen(true) }}
            >
                <X className='rotate-45' />
                Add Player
            </button>
            <table className="shadow-md rounded-lg w-full overflow-hidden border-collapse table-auto">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-center">No.</th>
                        <th className="px-4 py-2 text-left">Username</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {playerData.single.map((player, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-left">{player.Name}</td>
                            <td className="flex justify-center gap-3 px-4 py-2 w-full text-center">
                                <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-800 px-3 py-1 rounded w-21 font-semibold text-white text-sm"
                                    onClick={async () => {
                                        getPlayerById(selectedGame, player.Id).then(selectedPlayer => setPlayerValue(selectedPlayer));
                                        setIsUpdateModalOpen(true);
                                    }}
                                >
                                    <SquarePen />
                                    Edit
                                </button>
                                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-800 px-3 py-1 rounded w-25 font-semibold text-white text-sm"
                                    onClick={() => {
                                        setDeletedValue(player);
                                        setIsDeleteModalOpen(true);
                                    }}
                                >
                                    <Trash2 />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isAddModalOpen && (
                <FormModal
                    action={"Add"}
                    type={"Player"}
                    isOpen={isAddModalOpen}
                    onClose={handleAddModalClose}
                    onAction={addPlayers}
                    onInputChange={handlePlayerValueChange}
                    value={playerValue}
                    game={selectedGame}
                />
            )}
            {isUpdateModalOpen && (
                <FormModal
                    action={"Edit"}
                    type={"Player"}
                    isOpen={isUpdateModalOpen}
                    onClose={handleUpdateModalClose}
                    onAction={updatePlayers}
                    onInputChange={handlePlayerValueChange}
                    value={playerValue}
                    game={selectedGame}
                />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={handledeleteModalClose}
                    onDelete={deletePlayers}
                    value={deletedValue}
                    game={selectedGame}
                />
            )}
        </div>
    );
}