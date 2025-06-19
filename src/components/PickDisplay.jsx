export default function PickDisplay({ grid, picks, animationClasses }) {
    const { gridBlue, gridRed } = grid;
    const { blue: bluePicks, red: redPicks } = picks
    const { blue: animationBlueClass, red: animationRedClass } = animationClasses;
    const pickBlueId = [1, 2, 3, 4, 5];
    const pickRedId = [6, 7, 8, 9, 10];
    
    const renderPicks = (ids, picks, animationClass) => {
        return ids.map((id) => (
            <div className="bg-yellow-100 bg-cover bg-center border-x-2 w-29 h-45 overflow-hidden" key={id}>
                <img className={`w-full object-cover ${animationClass[(id - 1) % 5]}`} src={picks[(id - 1) % 5].img} alt="" />
            </div>
        ));
    };

    return (
        <>
            <div className={`flex ${gridBlue}`}>
                {renderPicks(pickBlueId, bluePicks, animationBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${gridRed}`}>
                {renderPicks(pickRedId, redPicks, animationRedClass)}
            </div>
        </>
    );
}
