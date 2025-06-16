import { supabaseMLBB } from '../utils/supabaseClients.js';

const getClient = (game) => {
    switch (game) {
        case 'MLBB':
            return supabaseMLBB;
        default:
            throw new Error('Unknown game selected');
    }
};

export const getHeroes = async (game) => {
    const supabase = getClient(game);
    try {
        const { data, error } = await supabase.from('Heroes').select();
        if (error) throw error;
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getTeams = async (game) => {
    const supabase = getClient(game);
    try {
        const { data, error } = await supabase.from('Teams').select('*');
        if (error) throw error;
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getPlayersByTeam = async (game, teamName) => {
    const supabase = getClient(game);
    try {
        const { data: teamData, error: teamError } = await supabase
        .from('Teams')
        .select('Id')
        .eq('Name', teamName)
        .maybeSingle();
        if (teamError) throw teamError;
        if (!teamData) return { error: 'Team not found' };

        const { data: players, error: playersError } = await supabase
        .from('Players')
        .select('Id, Username')
        .eq('Team_id', teamData.Id);
        if (playersError) throw playersError;
        return players.length > 0 ? players : { error: 'No players found in this team' };
    } catch (err) {
        return { error: err.message };
    }
};

export const addTeams = (game)=>{
    const supabase = getClient(game)
}

export const updateTeams = (game)=>{
    const supabase = getClient(game)
}

export const deleteTeams = (game)=>{
    const supabase = getClient(game)
}

export const addPlayers = (game)=>{
    const supabase = getClient(game)
}

export const updatePlayers = (game)=>{
    const supabase = getClient(game)
}

export const deletePlayers = (game)=>{
    const supabase = getClient(game)
}
