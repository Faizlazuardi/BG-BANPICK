import { useState, useEffect } from "react";
import { getHeroes } from "../../services/api.js";

export const useHeroData = (games) => {
    const [heroData, setHeroData] = useState([]);
    
    useEffect(() => {
        const fetchHeroData = async () => {
            const data = await getHeroes(games);
            if (!data.error) setHeroData(data);
        };
        fetchHeroData();
    }, [games]);
    return { heroData };
};
