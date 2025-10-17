import { TEAM_SIZE } from '../../../constants/gameConstant';

import { useDraftContext } from '../../../contexts/DraftContext';

export default function PickDisplay({ grid }) {
    const { pickSelection, animationClasses:{pick: animationClasses}} = useDraftContext()
    const { blue: bluePicks, red: redPicks } = pickSelection
    const { blue: animationBlueClass, red: animationRedClass } = animationClasses;
    
    const renderPicks = (picks, animationClass) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => (
            <div className="bg-yellow-100 bg-cover bg-center border-x-2 w-29 h-45 overflow-hidden" key={index}>
                <img className={`w-full object-cover ${animationClass[index]}`} src={picks[index].img} alt="" />
            </div>
        ));
    };

    return (
        <>
            <div className={`flex ${grid.Blue}`}>
                {renderPicks(bluePicks, animationBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${grid.Red}`}>
                {renderPicks(redPicks, animationRedClass)}
            </div>
        </>
    );
}
