import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getHeroes = async (game) => {
    if (game === 'MLBB') {
        try {
            const { data, error } = await supabase.from('Heroes').select();
            if (error) throw error;
            return data;
        } catch (err) {
            return { error: err.message };
        }
    }
};

export const getTeams = async (game) => {
    if (game === "MLBB") {
        try {
            const { data, error } = await supabase.from('Teams').select('*');
            if (error) throw error;
            return data;
        } catch (err) {
            return { error: err.message };
        }
    }
};

export const getPlayersByTeam = async (teamName) => {
    try {
        const { data: teamData, error: teamError } = await supabase
            .from('Teams')
            .select('Id')
            .eq('Name', teamName)
            .maybeSingle();
        if (teamError) throw teamError;
        if (!teamData) return { error: "Team not found" };

        const { data: players, error: playersError } = await supabase
            .from('Players')
            .select('Id, Username')
            .eq('Team_id', teamData.Id);
        if (playersError) throw playersError;
        return players.length > 0 ? players : { error: "No players found in this team" };
    } catch (err) {
        console.error("Error fetching players:", err);
        return { error: err.message };
    }
};