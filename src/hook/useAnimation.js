import { useState } from "react";

export const initialAnimationState = {
    pick: {
        red: Array(5).fill(""),
        blue: Array(5).fill("")
    },
    ban: {
        red: Array(5).fill(""),
        blue: Array(5).fill("")
    }
};

export const useAnimation = ({ pickSelection, handlePick, banSelection, handleBan }) => {
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
                }, 1200);
            }, 1200);
        } else {
            handleSelection(type, team, id, hero);
            handleAnimationFlyIn(type, team, id)
            flyInTimeout = setTimeout(() => {
                setAnimationClasses(initialAnimationState);
            }, 1200);
        }
        return () => {
            if (flyOutTimeout) clearTimeout(flyOutTimeout);
            if (flyInTimeout) clearTimeout(flyInTimeout);
        };
    };

    return {
        animationClasses, setAnimationClasses,
        handleAnimationFlyIn,
        handleAnimationFlyOut,
        handleAnimatedSelection
    };
}