import { useState, useEffect } from "react";
import { getHeroes } from "../services/api.js";

export const useHeroData = (selectedGame) => {
    const [heroData, setHeroData] = useState([]);
    
    useEffect(() => {
        const fetchHeroData = async () => {
            const data = await getHeroes(selectedGame);
            if (!data.error) setHeroData(data);
        };
        fetchHeroData();
    }, [selectedGame]);
    return { heroData };
};
