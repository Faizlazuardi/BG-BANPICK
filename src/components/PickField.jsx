import { useRef } from "react";

export default function PickField({ onPickSelectionChange, onPickInputChange, pickInputs, heroes, onShiftPick, swapStatus, onswapStatusChange }) {
    const { blue: bluePickInputs, red: redPickInputs } = pickInputs;
    const pickBlueIds = [1, 2, 3, 4, 5];
    const pickRedIds = [6, 7, 8, 9, 10];
    const inputRefs = useRef({});

    const renderPickField = ({ teamSide, ids, pickInput }) => {
        return ids.map((id, index) => {
            return (
                <div className="flex items-center gap-5" key={id}>
                    <div className="">
                        <input
                            ref={(elem) => (inputRefs.current[id] = elem)}
                            id={`pick-${teamSide}-${id}`}
                            className="peer rounded-md"
                            type="text"
                            placeholder={`${teamSide} Side Pick ${index + 1}`}
                            value={pickInput[index]}
                            onChange={(e) => onPickInputChange(teamSide.toLowerCase(), index, e.target.value)}
                        />
                        <div id={`dropdown-picked-${teamSide}-${id}`} className="invisible absolute bg-white w-36.5 max-h-15 overflow-y-auto peer-focus:visible">
                            {heroes
                                .filter(hero => hero.Name.toLowerCase().startsWith(pickInput[index].toLowerCase()))
                                .map(hero => (
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                                        key={hero.Id}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            const shiftId = onShiftPick(teamSide.toLowerCase(), index);
                                            onPickSelectionChange(teamSide.toLowerCase(), shiftId, { name: hero.Name, img: hero.Picked });
                                            onPickInputChange(teamSide.toLowerCase(), shiftId, hero.Name);
                                            inputRefs.current[id].blur();
                                        }}
                                    >
                                        {hero.Name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-5 h-5">
                        <input
                            className="peer absolute opacity-0 w-5 h-5"
                            id={`swap-${id}`}
                            type="checkbox"
                            checked={swapStatus[teamSide.toLowerCase()][index]}
                            onChange={() => onswapStatusChange(teamSide.toLowerCase(), index)}
                        />
                        <div className="absolute border-3 border-black peer-checked:border-blue-700 rounded-sm w-5 h-5" />
                        <label
                            className="bottom-0.75 relative flex justify-center w-5 h-5 peer-checked:text-blue-700 cursor-pointer"
                            htmlFor={`swap-${id}`}
                        >
                            ↑↓
                        </label>
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <div className="flex flex-col gap-5">
                <h1 className="w-[140px] font-bold text-lg text-center">Blue Pick</h1>
                {renderPickField({ teamSide: "Blue", ids: pickBlueIds, pickInput: bluePickInputs })}
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="w-[140px] font-bold text-lg text-center">Red Pick</h1>
                {renderPickField({ teamSide: "Red", ids: pickRedIds, pickInput: redPickInputs })}
            </div>
        </>
    );
}
