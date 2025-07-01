import { useState } from "react";
import { createTeamArray } from "../utils/arrayUtils";
import { TEAM_SIZE, TIMEOUT_DURATION } from "../constants/gameConstant";

export const useAnimation = ({ pickSelection, handlePick, banSelection, handleBan }) => {
    const initialAnimationState = {
        pick: createTeamArray(TEAM_SIZE, ""),
        ban: createTeamArray(TEAM_SIZE, "")
    };
    const [animationClasses, setAnimationClasses] = useState(initialAnimationState);
    
    const handleAnimationFlyIn = (type, team, id) => {
        setAnimationClasses(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [team]: prev[type][team].map((item, i) => (i === id ? "fly-in" : item))
            }
        }));
    };

    const handleAnimationFlyOut = (type, team, id) => {
        setAnimationClasses(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [team]: prev[type][team].map((item, i) => (i === id ? "fly-out" : item))
            }
        }));
    };

    const handleAnimatedSelection = (type, team, id, hero) => {
        let flyOutTimeout, flyInTimeout;
        const selection = type === "pick" ? pickSelection[team][id] : banSelection[team][id];
        const handleSelection = type === "pick" ? handlePick : handleBan;
        
        if (selection && selection.img) {
            handleAnimationFlyOut(type, team, id)
            flyOutTimeout = setTimeout(() => {
                handleSelection(type, team, id, hero);
                handleAnimationFlyIn(type, team, id)
                flyInTimeout = setTimeout(() => {
                    setAnimationClasses(initialAnimationState);
                }, TIMEOUT_DURATION);
            }, TIMEOUT_DURATION);
        } else {
            handleSelection(type, team, id, hero);
            handleAnimationFlyIn(type, team, id)
            flyInTimeout = setTimeout(() => {
                setAnimationClasses(initialAnimationState);
            }, TIMEOUT_DURATION);
        }
        return () => {
            if (flyOutTimeout) clearTimeout(flyOutTimeout);
            if (flyInTimeout) clearTimeout(flyInTimeout);
        };
    };

    return {
        initialAnimationState, animationClasses, setAnimationClasses,
        handleAnimationFlyIn,
        handleAnimationFlyOut,
        handleAnimatedSelection
    };
}