import { X } from 'lucide-react';

import { TEAM_SIZE } from '../../../constants/gameConstant';

import { useDraftContext } from '../../../contexts/DraftContext';

export default function ban({ grid }) {
    const { banSelection, animationClasses: { ban: animationClasses } } = useDraftContext()
    const { blue: blueBans, red: redBans } = banSelection;
    const { blue: animationBlueClass, red: animationRedClass } = animationClasses;

    const renderBans = (bans, animationClass) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => (
            <div key={index}>
                <div className="flex justify-center items-center bg-black bg-cover bg-center w-16 h-16 overflow-hidden" key={index}>
                    <X className="absolute w-15 h-15 text-amber-300" />
                    <img className={`grayscale-100 h-full object-cover ${animationClass[index]}`} src={bans[index].img} alt="" />
                </div>
            </div>
        ))
    }

    return (
        <>
            <div className={`flex ${grid.Blue}`}>
                {renderBans(blueBans, animationBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${grid.Red}`}>
                {renderBans(redBans, animationRedClass)}
            </div>
        </>
    )
}
