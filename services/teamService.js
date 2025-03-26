export const getTeams = async (game) => {
    if (game === "MLBB") {
        try {
            const response = await fetch('/api/teams');
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to fetch teams");
            return data;
        } catch (err) {
            console.error('Error fetching teams:', err.message);
            return { error: err.message };
        }
    }
};
