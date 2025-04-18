import React, { useEffect, useState } from "react";
import { getTeams } from "../../services/api";

export default function RosterManager() {
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const teamsPerPage = 10;

    useEffect(() => {
        const fetchDefaultGameData = async () => {
            const team = await getTeams("MLBB");
            if (!team.error) {
                setTeams(team);
            }
        };
        fetchDefaultGameData();
    }, []);

    // Hitung total halaman
    const totalPages = Math.ceil(teams.length / teamsPerPage);

    // Ambil data tim berdasarkan halaman saat ini
    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

    return (
        <main className="flex flex-col flex-grow items-center gap-5 mt-5">
            <h1 className="text-5xl">Roster Manager</h1>
            <table className="shadow-md mt-4 border border-gray-300 rounded-lg w-full max-w-4xl overflow-hidden border-collapse table-auto">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2 w-16 text-center">No.</th>
                        <th className="px-4 py-2 w-32 text-center">Team Logo</th>
                        <th className="px-4 py-2 w-64 text-left">Team Name</th>
                        <th className="px-4 py-2 w-48 text-center">Action</th>
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
                            <td className="space-x-2 px-4 py-2 text-center">
                                <button className="bg-yellow-500 hover:bg-yellow-700 px-3 py-1 rounded font-bold text-white text-sm">
                                    View
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded font-bold text-white text-sm">
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded font-bold text-white text-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
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
        </main>
    );
}