import { useRef } from "react";

import { ArrowUpDown } from 'lucide-react';

import { useGameContext } from "../contexts/GameContext";
import { useHeroData } from "../hooks/useHeroData";

import { TEAM_SIZE } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export default function PickField({ onPickSelectionChange, onPickInputChange, pickInputs, onShiftPick, swapStatus, onSwapStatusChange }) {
    const { selectedGame } = useGameContext()
    const { heroData } = useHeroData(selectedGame);
    const { blue: bluePickInputs, red: redPickInputs } = pickInputs;
    const inputRefs = useRef(createTeamArray(TEAM_SIZE, ""));

    const renderPickField = ({ teamSide, pickInput }) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => {
            return (
                <div className="flex items-center gap-5" key={index}>
                    <div className="">
                        <input
                            ref={(elem) => (inputRefs.current[teamSide.toLowerCase()][index] = elem)}
                            id={`pick-${teamSide}-${index + 1}`}
                            className="peer rounded-md w-36.5"
                            type="text"
                            placeholder={`${teamSide} Side Pick ${index + 1}`}
                            value={pickInput[index]}
                            onChange={(e) => onPickInputChange(teamSide.toLowerCase(), index, e.target.value)}
                        />
                        <div id={`dropdown-picked-${teamSide}-${index + 1}`} className="invisible absolute bg-white w-36.5 max-h-20 overflow-y-auto peer-focus:visible">
                            {heroData
                                .filter(hero => hero.Name.toLowerCase().startsWith(pickInput[index].toLowerCase()))
                                .map(hero => (
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 h-10 cursor-pointer"
                                        key={hero.Id}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            const shiftId = onShiftPick(teamSide.toLowerCase(), index);
                                            onPickSelectionChange(teamSide.toLowerCase(), shiftId, { name: hero.Name, img: hero.Picked });
                                            onPickInputChange(teamSide.toLowerCase(), shiftId, hero.Name);
                                            inputRefs.current[teamSide.toLowerCase()][index].blur();
                                        }}
                                    >
                                        {hero.Name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="relative flex justify-center items-center w-7 h-7">
                        <input
                            className="peer top-0 left-0 absolute opacity-0 w-7 h-7"
                            id={`swap-${teamSide}-${index}`}
                            aria-label={`swap-${teamSide}-${index}`}
                            type="checkbox"
                            checked={swapStatus[teamSide.toLowerCase()][index]}
                            onChange={() => onSwapStatusChange(teamSide.toLowerCase(), index)}
                        />
                        <div className="top-0 left-0 absolute border-3 border-black peer-checked:border-blue-700 rounded-sm w-7 h-7" />
                        <ArrowUpDown className="top-0 relative flex justify-center items-center rounded-sm w-4 h-4 peer-checked:text-blue-700 cursor-pointer" />
                    </div>
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
