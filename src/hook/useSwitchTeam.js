export const useSwitchTeam = ({ setTeamSelection, setPlayerInputs }) => {
    
    const switchTeam = () => {
        setPlayerInputs(prev => ({ blue: prev.red, red: prev.blue }));
        setTeamSelection(prev => ({ blue: prev.red, red: prev.blue }));
    };
    
    return {
        switchTeam,
    };
};