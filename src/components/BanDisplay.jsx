import { X } from 'lucide-react';

import { TEAM_SIZE } from '../constants/gameConstant';

export default function ban({ grid, bans, animationClasses }) {
    const { gridBlue, gridRed } = grid;
    const { blue: blueBans, red: redBans } = bans;
    const { blue: animationBlueClass, red: animationRedClass } = animationClasses;

    const renderBans = (bans, animationClass) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => (
            <div key={index}>
                <div className="flex justify-center items-center bg-black bg-cover bg-center w-16 h-16 overflow-hidden" key={index}>
                    <X className="absolute w-15 h-15 text-amber-300" />
                    <img className={`grayscale-100 h-full object-cover ${animationClass[index]}`} src={bans[index].img} alt=""/>
                </div>
            </div>
        ))
    }

    return (
        <>
            <div className={`flex ${gridBlue}`}>
                {renderBans(blueBans, animationBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${gridRed}`}>
                {renderBans(redBans, animationRedClass)}
            </div>
        </>
    )
}
