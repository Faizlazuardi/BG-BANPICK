import { TEAM_SIZE } from '../constants/gameConstant';

export default function PickDisplay({ grid, picks, animationClasses }) {
    const { gridBlue, gridRed } = grid;
    const { blue: bluePicks, red: redPicks } = picks
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
            <div className={`flex ${gridBlue}`}>
                {renderPicks(bluePicks, animationBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${gridRed}`}>
                {renderPicks(redPicks, animationRedClass)}
            </div>
        </>
    );
}
