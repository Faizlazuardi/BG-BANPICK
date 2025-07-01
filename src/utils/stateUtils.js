export const createTeamArray = (TEAM_SIZE, value) => ({
    blue: Array(TEAM_SIZE).fill(value),
    red: Array(TEAM_SIZE).fill(value)
});
