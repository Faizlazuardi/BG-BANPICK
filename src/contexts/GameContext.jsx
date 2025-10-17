import { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
    const roundOptions = [
        { id: "1", option: "Quarterfinals", value: "Quarterfinals" },
        { id: "2", option: "Semifinals", value: "Semifinals" },
        { id: "3", option: "Bronze Match", value: "Bronze Match" },
        { id: "4", option: "Grand Final", value: "Grand Final" }
    ];

    const BestOfOption = [
        { id: 1, option: "Best of 3", value: 3 },
        { id: 2, option: "Best of 5", value: 5 },
        { id: 3, option: "Best of 7", value: 7 }
    ];
    
    
    const gameOptions = [
        { id: 1, option: "MLBB", value: "MLBB" },
    ];

    const banOptions = [
        { id: 1, option: "3 Bans", value: 3 },
        { id: 2, option: "5 Bans", value: 5 },
    ];

    
    const [selectedRound, setSelectedRound] = useState(roundOptions[0].value);
    const [selectedBestOf, setSelectedBestOf] = useState(BestOfOption[0].value);
    const [selectedGame, setSelectedGame] = useState(gameOptions[0].value);
    
    const requiredWins = Math.ceil(selectedBestOf / 2);

    return (
        <GameContext.Provider value={{
            roundOptions, selectedRound, setSelectedRound,
            BestOfOption, selectedBestOf, setSelectedBestOf, requiredWins,
            gameOptions, selectedGame, setSelectedGame,
            banOptions, selectedTotalBan, setSelectedTotalBan
        }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGameContext = () => useContext(GameContext);
