export const getPlayersByTeam = async (teamName) => {
    try {
        const response = await fetch(`/api/players/${encodeURIComponent(teamName)}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch players");
        return data;
    } catch (err) {
        console.error("Error fetching players:", err);
        return { error: err.message };
    }
};
