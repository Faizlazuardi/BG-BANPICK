import { createContext, useContext } from 'react';

import { useTeam } from "../hooks/useTeam";
import { usePlayerData } from "../hooks/usePlayerData";
import { usePlayer } from "../hooks/usePlayer";
import { useBan } from "../hooks/useBan";
import { usePick } from "../hooks/usePick";
import { useAnimation } from "../hooks/useAnimation";
import { useSwap } from "../hooks/useSwap";
import { usePhase } from "../hooks/usePhase";

const DraftContext = createContext();

export function DraftProvider({ children }){
    const { 
        initialTeamInputState, teamInput, setTeamInput, handleTeamInputChange, 
        initialTeamSelectionState, teamSelection, setTeamSelection, handleTeamChange, handleWinCheckChange
    } = useTeam();
    
    const initialPlayerDataState = {blue: [], red: [] }
    const { playerData, setPlayerData } = usePlayerData({ teamSelection, initialPlayerDataState});
    const { initialPlayerInputsState, playerInputs, setPlayerInputs, handlePlayerInputsChange } = usePlayer();
    
    const { 
        initialBanSelectionState, banSelection, setBanSelection, 
        initialBanInputsState,banInputs, setBanInputs,
        handleBan
    } = useBan();
    
    const { 
        initialPickSelectionState, pickSelection, setPickSelection,
        initialPickInputsState, pickInputs, setPickInputs,
        handlePick
    } = usePick();
    
    const { 
        initialAnimationState, animationClasses, setAnimationClasses,
        handleAnimationFlyIn, handleAnimationFlyOut,
        handleAnimatedSelection
    } = useAnimation({
        pickSelection, handlePick,
        banSelection, handleBan
    });
    
    const { initialSwapStatus, swapStatus, setSwapStatus, handleswapStatusChange } = useSwap({
        setPickSelection, setPickInputs,
        handleAnimationFlyIn, handleAnimationFlyOut
    });

    const { highlights, setHighlights, initialHighlights, setPhase, phase, action } = usePhase(banSelection, pickSelection);

    return (
        <DraftContext.Provider value={{
            initialTeamInputState, teamInput, setTeamInput, handleTeamInputChange,
            initialTeamSelectionState, teamSelection, setTeamSelection, handleTeamChange, handleWinCheckChange,
            initialPlayerDataState, playerData, setPlayerData,
            initialPlayerInputsState, playerInputs, setPlayerInputs, handlePlayerInputsChange,
            initialBanSelectionState, banSelection, setBanSelection,
            initialBanInputsState, banInputs, setBanInputs, handleBan,
            initialPickSelectionState, pickSelection, setPickSelection,
            initialPickInputsState, pickInputs, setPickInputs, handlePick,
            initialAnimationState, animationClasses, setAnimationClasses, handleAnimationFlyIn, handleAnimationFlyOut, handleAnimatedSelection,
            initialSwapStatus, swapStatus, setSwapStatus, handleswapStatusChange,
            highlights, setHighlights, initialHighlights, setPhase, phase, action
        }}>
            {children}
        </DraftContext.Provider>
    );
}

export const useDraftContext = () => useContext(DraftContext);