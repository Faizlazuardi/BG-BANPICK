import { useState, useEffect } from "react";
import { getAllHeroes } from "../services/api.js";

export const useHeroData = (selectedGame) => {
    const [heroData, setHeroData] = useState([]);

    useEffect(() => {
        const fetchHeroData = async () => {
            const data = await getAllHeroes(selectedGame);
            if (!data.error) setHeroData(data);
        };
        fetchHeroData();
    }, [selectedGame]);
    return { heroData };
};
