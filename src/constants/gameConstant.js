export const TEAM_SIZE = 5;
export const TIMEOUT_DURATION = 1200;
export const generatePhaseActions = () => {
    const actions = [];
    
    for (let i = 0; i < 3; i++) {
        actions.push({ type: 'ban', team: 'blue', index: i });
        actions.push({ type: 'ban', team: 'red', index: i });
    }
    
    actions.push({ type: 'pick', team: 'blue', index: [0] });
    actions.push({ type: 'pick', team: 'red', index: [0, 1] });
    actions.push({ type: 'pick', team: 'blue', index: [1, 2] });
    actions.push({ type: 'pick', team: 'red', index: [2] });
    
    for (let i = 3; i < 5; i++) {
        actions.push({ type: 'ban', team: 'red', index: i });
        actions.push({ type: 'ban', team: 'blue', index: i });
    }
    
    actions.push({ type: 'pick', team: 'red', index: [3] });
    actions.push({ type: 'pick', team: 'blue', index: [3, 4] });
    actions.push({ type: 'pick', team: 'red', index: [4] });
    return actions;
};