import { useRef } from "react";

export default function BanField({ onBanSelectionChange, onBanInputChange, banInputs, heroes }) {
    const { blue: blueBanInputs, red: redBanInputs } = banInputs;
    const banBlueIds = [1, 2, 3, 4, 5];
    const banRedIds = [6, 7, 8, 9, 10];
    const inputRefs = useRef({});

    const renderBanField = ({ teamSide, ids, banInput}) => {
        return ids.map((id, index) => {
            return (
                <div className="flex items-center gap-5" key={id}>
                    <div>
                        <input
                            ref={(elem) => (inputRefs.current[id] = elem)}
                            id={`ban-${teamSide}-${id}`}
                            className="peer rounded-md"
                            type="text"
                            placeholder={`${teamSide} Side Ban ${index + 1}`}
                            value={banInput[index]}
                            onChange={(e) => onBanInputChange(teamSide.toLowerCase(), index, e.target.value)}
                        />
                        <div id={`dropdown-banned-${teamSide}-${id}`} className="invisible absolute bg-white w-36.5 max-h-15 overflow-y-auto peer-focus:visible">
                            {heroes
                                .filter(hero => hero.Name.toLowerCase().startsWith(banInput[index].toLowerCase()))
                                .map(hero => (
                                    <div className="flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer"
                                        key={hero.Id}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            onBanSelectionChange(teamSide.toLowerCase(), index, { name: hero.Name, img: hero.Banned });
                                            onBanInputChange(teamSide.toLowerCase(), index, hero.Name);
                                            inputRefs.current[id].blur();
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
                {renderBanField({ teamSide: "Blue", ids: banBlueIds, banInput: blueBanInputs })}
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="w-[140px] font-bold text-lg text-center">Red Ban</h1>
                {renderBanField({ teamSide: "Red", ids: banRedIds, banInput: redBanInputs })}
            </div>
        </>
    );
}