import { createContext, useState, useContext, useEffect, use } from 'react';

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
    
    const [selectedRound, setSelectedRound] = useState(() => {
        return localStorage.getItem("selectedRound") || roundOptions[0].round;
    });
    
    const [selectedBestOf, setSelectedBestOf] = useState(() => {
        const savedBestOf = localStorage.getItem("selectedBestOf");
        return savedBestOf ? JSON.parse(savedBestOf) : BestOfOption[0].value;
    });
    
    const [selectedGame, setSelectedGame] = useState(() => {
        return localStorage.getItem("selectedGame") || gameOptions[0].game;
    });
    
    useEffect(() => {
        localStorage.setItem("selectedRound", selectedRound);
    }, [selectedRound]);
    
    useEffect(() => {
        localStorage.setItem("selectedBestOf", JSON.stringify(selectedBestOf));
    }, [selectedBestOf]);
    
    useEffect(() => {
        localStorage.setItem("selectedGame", selectedGame);
    }, [selectedGame]);
    
    const requiredWins = Math.ceil(selectedBestOf / 2);

    return (
        <GameContext.Provider value={{
            roundOptions, selectedRound, setSelectedRound,
            BestOfOption, selectedBestOf, setSelectedBestOf, requiredWins,
            gameOptions, selectedGame, setSelectedGame,
        }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGameContext = () => useContext(GameContext);
