import { useState } from 'react';

import { X, Eye, SquarePen, Trash2 } from 'lucide-react';

import UpdateModal from './UpdateModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

import { useTeamData } from "../hooks/useTeamData";

import { useGameContext } from "../contexts/GameContext";

import { getTeamById, updateTeams, deleteTeams } from '../services/api';

export default function TeamList({handleTeamSelectionChange}) {
    const { selectedGame } = useGameContext()
    
    const [updatedValue, setUpdatedValue] = useState(null);
    
    const handleUpdatedValueChange = (Field, value) => {
        if (Field === "Logo") {
            value = URL.createObjectURL(value);
        }
        setUpdatedValue((prev) => {
            return {
                ...prev,
                [Field]: value,
            };
        });
    };
    
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
    };
    
    const [deletedValue, setDeletedValue] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const handledeleteModalClose = () => {
        setIsDeleteModalOpen(false);
    };
    
    const { teamData } = useTeamData(selectedGame);
    
    const [currentPage, setCurrentPage] = useState(1);
    const teamsPerPage = 10;
    const totalPages = Math.ceil(teamData.length / teamsPerPage);
    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teamData.slice(indexOfFirstTeam, indexOfLastTeam);

    return (
        <div className="flex flex-col flex-grow gap-5 mt-5 max-w-3xl text-cyan-950">
            <h1 className="text-5xl text-center">Team List</h1>
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-800 px-3 py-1 rounded w-32 font-semibold text-white text-sm">
                <X className='rotate-45'/>
                Add Team
            </button>
            <table className="shadow-md rounded-lg w-full overflow-hidden border-collapse table-auto">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-center">No.</th>
                        <th className="px-4 py-2 text-center">Team Logo</th>
                        <th className="px-4 py-2 text-left">Team Name</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentTeams.map((team, index) => (
                        <tr key={team.Id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 text-center">{indexOfFirstTeam + index + 1}</td>
                            <td className="flex justify-center px-4 py-2">
                                <img src={team.Logo || null} className="w-12 h-12 object-cover" alt="Team Logo" />
                            </td>
                            <td className="px-4 py-2 text-left">{team.Name}</td>
                            <td className="flex gap-3 px-4 py-2 w-full text-center">
                                <button
                                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-800 px-3 py-1 rounded w-23 font-semibold text-white text-sm"
                                    onClick={() => handleTeamSelectionChange(team.Name)}
                                >
                                    <Eye/>
                                    View
                                </button>
                                <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-800 px-3 py-1 rounded w-21 font-semibold text-white text-sm"
                                    onClick={async () => {
                                        const data = await getTeamById(selectedGame, team.Id);
                                        setUpdatedValue(data);
                                        setIsUpdateModalOpen(true);
                                    }}
                                >
                                    <SquarePen/>
                                    Edit
                                </button>
                                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-800 px-3 py-1 rounded w-25 font-semibold text-white text-sm" 
                                    onClick={
                                        () => {
                                            setDeletedValue(team);
                                            setIsDeleteModalOpen(true)
                                        }
                                    }
                                >
                                    <Trash2/>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center space-x-4 mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="font-semibold text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <UpdateModal
                type={"Team"}
                isOpen={isUpdateModalOpen}
                onClose={handleUpdateModalClose}
                onUpdate={updateTeams}
                onInputChange={handleUpdatedValueChange}
                value={updatedValue}
                game={selectedGame}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handledeleteModalClose}
                onDelete={deleteTeams}
                value={deletedValue}
                game={selectedGame}
            />
        </div>
    );
}
