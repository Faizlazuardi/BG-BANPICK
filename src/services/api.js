import { supabaseMLBB } from '../lib/supabaseClients.js';

const getClient = (game) => {
    switch (game) {
        case 'MLBB':
            return supabaseMLBB;
        default:
            throw new Error('Unknown game selected');
    }
};

export const getAllHeroes = async (game) => {
    const supabase = getClient(game);
    try {
        const { data, error } = await supabase.from('Heroes').select();
        if (error) throw error;
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getAllTeams = async (game) => {
    const supabase = getClient(game);
    try {
        const { data, error } = await supabase.from('Teams').select('*').order('Id', { ascending: true });
        if (error) throw error;
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const getTeamById = async (game, id)=>{
    const supabase = getClient(game)
    const { data, error } = await supabase
        .from('Teams')
        .select('*')
        .eq('Id', id)
        .single()
        .order('Id', { ascending: true });
    if (error) {
        console.error('Error fetching team by ID:', error.message);
        throw error;
    }
    return data;
}

export const addTeams = async (game, input)=>{
    const supabase = getClient(game)
    const { data, error } = await supabase
    .from('Teams')
    .insert(input)
    .select()
    
    if (error) {
        console.error('Insert error:', error.message);
        throw error;
    }
    return data;
}

export const updateTeams = async (game, id, value)=>{
    const supabase = getClient(game)
    const { data, error } = await supabase
        .from('Teams')
        .update({
            Name: value.Name,
            Logo: value.Logo ? value.Logo : null
        })
        .eq('Id', id)
        .select()
    if (error) {
        console.error('Update error:', error.message);
        throw error;
    }
    return data;
}

export const deleteTeams = async (game, id)=>{
    const supabase = getClient(game)
    const { error } = await supabase
    .from('Teams')
    .delete()
    .eq('Id', id)
    if (error) {
        console.error('Delete error:', error.message);
        throw error;
    }
}

export const getAllPlayersByTeam = async (game, teamName) => {
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
        .select('Id, Name')
        .eq('Team_id', teamData.Id)
        .order('Id', { ascending: true });
    
    if (playersError) throw playersError;
        return players.length > 0 ? players : { error: 'No players found in this team' };
    } catch (err) {
        return { error: err.message };
    }
};

export const getPlayerById = async (game, id) => {
    const supabase = getClient(game);
    try {
    const { data, error } = await supabase
    .from('Players')
    .select('Team:Teams(Id, Name), Id, Name, Foto')
    .eq('Id', id)
    .single()
    .order('Id', { ascending: true });
    
    if (error) throw error;
        return data;
    } catch (err) {
        return { error: err.message };
    }
};

export const addPlayers = async (game)=>{
    const supabase = getClient(game)
}

export const updatePlayers = async (game, id, value)=>{
    const supabase = getClient(game)
    const { data, error } = await supabase
    .from('Players')
    .update({
        Team_id: value.Team.Id,
        Name: value.Name,
        Foto: value.Foto ? value.Foto : null
    })
    .eq('Id', id)
    .select()
}

export const deletePlayers = async (game, id)=>{
    const supabase = getClient(game)
        const { error } = await supabase
    .from('Players')
    .delete()
    .eq('Id', id)
    
    if (error) {
        console.error('Delete error:', error.message);
        throw error;
    }
}
