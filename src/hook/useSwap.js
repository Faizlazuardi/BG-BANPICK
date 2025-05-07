import { useState, useEffect } from "react";

export const initialSwapStatus = {
    blue: Array(5).fill(false),
    red: Array(5).fill(false)
};

export const useSwap = (setPickSelection, setPickInputs, handleAnimationFlyIn, handleAnimationFlyOut,) => {
    const [swapStatus, setSwapStatus] = useState(initialSwapStatus)
    
    const handleswapStatusChange = (team, index) => {
        setSwapStatus(prev => {
            const newswapStatus = [...prev[team]];
            newswapStatus[index] = !newswapStatus[index];
            return {
                ...prev,
                [team]: newswapStatus
            };
        });
    };

    const handleSwapPick = (team) => {
        const ids = swapStatus[team].reduce((acc, value, index) => {
            if (value) acc.push(index);
            return acc;
        }, []);
        
        if (ids.length === 2) {
            let flyTimeout;
            const [id1, id2] = ids;
            
            handleAnimationFlyOut("pick", team, id1);
            handleAnimationFlyOut("pick", team, id2);
            
            flyTimeout = setTimeout(() => {
                setPickSelection(prev => ({
                    ...prev,
                    [team]: prev[team].map((item, i) => {
                        if (i === id1) return prev[team][id2];
                        else if (i === id2) return prev[team][id1];
                        return item;
                    })
                }));
                
                setPickInputs(prev => ({
                    ...prev,
                    [team]: prev[team].map((item, i) => {
                        if (i === id1) return prev[team][id2];
                        else if (i === id2) return prev[team][id1];
                        return item;
                    })
                }));
                
                handleAnimationFlyIn("pick", team, id1);
                handleAnimationFlyIn("pick", team, id2);
            }, 1200);
            
            setSwapStatus(prev => ({
                ...prev,
                [team]: prev[team].map((item, i) => (i === id1 || i === id2 ? false : item))
            }));
            
            return () => {
                () => clearTimeout(flyTimeout);
            };
        }
    };

    useEffect(() => {
        Object.entries(swapStatus).forEach(([team]) => handleSwapPick(team));
    }, [swapStatus]);

    return {
        swapStatus,
        setSwapStatus,
        handleswapStatusChange
    };
}