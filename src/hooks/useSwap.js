import { useState, useEffect } from "react";
import { TEAM_SIZE, TIMEOUT_DURATION } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export const useSwap = ({setPickSelection, setPickInputs, handleAnimationFlyIn, handleAnimationFlyOut}) => {
    const initialSwapStatus = createTeamArray(TEAM_SIZE, false);
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
            }, TIMEOUT_DURATION);
            
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
        initialSwapStatus,
        swapStatus,
        setSwapStatus,
        handleswapStatusChange
    };
}