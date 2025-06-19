import { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
    const roundOptions = [
        { id: "1", round: "Quarterfinals" },
        { id: "2", round: "Semifinals" },
        { id: "3", round: "Bronze Match" },
        { id: "4", round: "Grand Final" }
    ];

    const gameOptions = [
        { id: 1, game: "MLBB" },
    ];

    const [selectedRound, setSelectedRound] = useState(() => {
        return localStorage.getItem("selectedRound") || roundOptions[0].round;
    });

    const [selectedGame, setSelectedGame] = useState(() => {
        return localStorage.getItem("selectedGame") || gameOptions[0].game;
    });

    useEffect(() => {
        localStorage.setItem("selectedRound", selectedRound);
    }, [selectedRound]);

    useEffect(() => {
        localStorage.setItem("selectedGame", selectedGame);
    }, [selectedGame]);

    return (
        <GameContext.Provider value={{
            roundOptions, selectedRound, setSelectedRound,
            gameOptions, selectedGame, setSelectedGame,
        }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGameContext = () => useContext(GameContext);
