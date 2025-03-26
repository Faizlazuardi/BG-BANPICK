export const getHeroes = async (game) => {
    if (game === 'MLBB') {
        try {
            const response = await fetch('/api/heroes');
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to fetch heroes");
            return data;
        } catch (err) {
            console.error('Error fetching heroes:', err.message);
            return { error: err.message };
        }
    }
};
