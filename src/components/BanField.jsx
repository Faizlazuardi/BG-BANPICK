import { useRef } from "react";

import { useGameContext } from "../contexts/GameContext";
import { useHeroData } from "../hooks/useHeroData";

import { TEAM_SIZE } from "../constants/gameConstant";
import { createTeamArray } from "../utils/arrayUtils";

export default function BanField({ onBanSelectionChange, onBanInputChange, banInputs }) {
    const { selectedGame } = useGameContext()
    const { heroData } = useHeroData(selectedGame);
    const { blue: blueBanInputs, red: redBanInputs } = banInputs;
    const inputRefs = useRef(createTeamArray(TEAM_SIZE, ""));

    const renderBanField = ({ teamSide, banInput}) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => {
            return (
                <div className="flex items-center gap-5" key={index}>
                    <div>
                        <input
                            ref={(elem) => (inputRefs.current[teamSide.toLowerCase()][index] = elem)}
                            id={`ban-${teamSide}-${index + 1}`}
                            className="peer rounded-md w-36.5"
                            type="text"
                            placeholder={`${teamSide} Side Ban ${index + 1}`}
                            value={banInput[index]}
                            onChange={(e) => onBanInputChange(teamSide.toLowerCase(), index, e.target.value)}
                        />
                        <div id={`dropdown-banned-${teamSide}-${index + 1}`} className="invisible absolute bg-white w-36.5 max-h-20 overflow-y-auto peer-focus:visible">
                            {heroData
                                .filter(hero => hero.Name.toLowerCase().startsWith(banInput[index].toLowerCase()))
                                .map(hero => (
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 h-10 cursor-pointer"
                                        key={hero.Id}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            onBanSelectionChange(teamSide.toLowerCase(), index, { name: hero.Name, img: hero.Banned });
                                            onBanInputChange(teamSide.toLowerCase(), index, hero.Name);
                                            inputRefs.current[teamSide.toLowerCase()][index].blur()
                                        }}
                                    >
                                        {hero.Name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <div className="flex flex-col gap-5">
                <h1 className="w-[140px] font-bold text-lg text-center">Blue Ban</h1>
                {renderBanField({ teamSide: "Blue", banInput: blueBanInputs })}
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="w-[140px] font-bold text-lg text-center">Red Ban</h1>
                {renderBanField({ teamSide: "Red", banInput: redBanInputs })}
            </div>
        </>
    );
}