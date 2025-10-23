import { TEAM_SIZE } from '../../../constants/gameConstant';

import { useDraftContext } from '../../../contexts/DraftContext';

export default function PickDisplay({ grid }) {
    const { pickSelection, animationClasses:{pick: animationClasses}} = useDraftContext()
    const { blue: bluePicks, red: redPicks } = pickSelection
    const { blue: animationBlueClass, red: animationRedClass } = animationClasses;
    
    const renderPicks = (picks, animationClass) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => (
            <div className="bg-[url('/images/BackroundPick.png')] bg-cover bg-center w-29 h-45 overflow-hidden" key={index}>
                <img className={`w-full object-cover ${animationClass[index]}`} src={picks[index].img} alt="" />
            </div>
        ));
    };

    return (
        <>
            <div className={`flex w-fit ${grid.Blue}`}>
                {renderPicks(bluePicks, animationBlueClass)}
            </div>
            <div className={`flex flex-row-reverse w-fit ${grid.Red}`}>
                {renderPicks(redPicks, animationRedClass)}
            </div>
        </>
    );
}
