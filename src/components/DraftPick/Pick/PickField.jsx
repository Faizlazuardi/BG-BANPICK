import { useRef, useState, useEffect } from "react";

import { ArrowUpDown } from 'lucide-react';

import { useGameContext } from "../../../contexts/GameContext";
import { useDraftContext } from "../../../contexts/DraftContext";

import { useHeroData } from "../../../hooks/useHeroData";

import { TEAM_SIZE } from "../../../constants/gameConstant";
import { createTeamArray } from "../../../utils/arrayUtils";

export default function PickField() {
    const { selectedGame } = useGameContext()
    const { action, pickInputs, handlePick, handleAnimatedSelection, swapStatus, handleswapStatusChange: onSwapStatusChange } = useDraftContext()
    const { type:actionType, team:actionTeam, index: actionIndex } = action;
    const { heroData } = useHeroData(selectedGame);
    const { blue: bluePickInputs, red: redPickInputs } = pickInputs;
    const onPickSelectionChange= (team, id, hero) => handleAnimatedSelection('pick', team, id, hero)
    const onPickInputChange= (team, id, hero) => handlePick("pickInput", team, id, hero)
    const inputRefs = useRef(createTeamArray(TEAM_SIZE, ""));
    const [shiftId, setShiftId] = useState(null)
    
    useEffect(() => {
        if (actionIndex.length === 1) {
            setShiftId(actionIndex[0]);
        }
    }, [actionIndex]);
    
    const renderPickField = ({ teamSide, pickInput }) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => {
            return (
                <div className="flex items-center gap-2" key={index}>
                    <div className="">
                        <input
                            ref={(elem) => (inputRefs.current[teamSide.toLowerCase()][index] = elem)}
                            id={`pick-${teamSide}-${index + 1}`}
                            className={`peer rounded-md w-36.5 ${ actionType === "pick" ? (actionIndex.includes(index) && actionTeam === teamSide.toLowerCase() ? "border-blue-500" : null) : null}`}
                            type="text"
                            placeholder={`${teamSide} Side Pick ${index + 1}`}
                            value={pickInput[index]}
                            onChange={(e) => onPickInputChange(teamSide.toLowerCase(), index, e.target.value)}
                            disabled={ (actionType === "pick") ? (actionTeam !== teamSide.toLowerCase()) : true }
                        />
                        {actionType === "pick" && actionTeam === teamSide.toLowerCase() && (
                            <div className="invisible absolute bg-white w-36.5 max-h-20 overflow-y-auto peer-focus:visible">
                                {heroData
                                    .filter(hero => hero.Name.toLowerCase().startsWith(pickInput[index].toLowerCase()))
                                    .map(hero => (
                                        <div className="flex items-center gap-2 hover:bg-gray-100 p-2 h-10 cursor-pointer"
                                            key={hero.Id}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => {
                                                const isShiftField = !actionIndex.includes(index);
                                                const isShifted = isShiftField && shiftId === null
                                                if (isShifted) return;
                                                const id = shiftId === null ? index : shiftId;
                                                onPickSelectionChange(teamSide.toLowerCase(), id, { name: hero.Name, img: hero.Picked });
                                                onPickInputChange(teamSide.toLowerCase(), id, hero.Name);
                                                setShiftId(null)
                                                inputRefs.current[teamSide.toLowerCase()][index].blur();
                                            }}
                                        >
                                            {hero.Name}
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                    <div className="w-6">
                        {actionType === 'pick' && teamSide.toLowerCase() === actionTeam && index > Math.max(...actionIndex) && actionIndex.length > 1 && (
                            actionIndex.map((value, index) => (
                                <div key={index} className={`hover:bg-gray-300 w-6 h-6 text-center ${shiftId === value ? "bg-gray-300" : "" }` } onClick={()=> setShiftId(value)}>
                                    {value + 1}
                                </div>
                            ))
                        )}
                    </div>
                    <label className="relative flex justify-center items-center w-7 h-7">
                        <input
                            className="peer absolute opacity-0 w-full h-full"
                            id={`swap-${teamSide}-${index}`}
                            aria-label={`swap-${teamSide}-${index}`}
                            type="checkbox"
                            checked={swapStatus[teamSide.toLowerCase()][index]}
                            onChange={() => onSwapStatusChange(teamSide.toLowerCase(), index)}
                        />
                        <div className="absolute border-3 border-black peer-checked:border-blue-700 rounded-sm w-full h-full" />
                        <ArrowUpDown className="top-0 relative flex justify-center items-center rounded-sm w-4 h-4 peer-checked:text-blue-700 cursor-pointer" />
                    </label>
                </div>
            );
        });
    };

    return (
        <>
            <div className="flex flex-col gap-5">
                <h1 className="w-[140px] font-bold text-lg text-center">Blue Pick</h1>
                {renderPickField({ teamSide: "Blue", pickInput: bluePickInputs })}
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="w-[140px] font-bold text-lg text-center">Red Pick</h1>
                {renderPickField({ teamSide: "Red", pickInput: redPickInputs })}
            </div>
        </>
    );
}
