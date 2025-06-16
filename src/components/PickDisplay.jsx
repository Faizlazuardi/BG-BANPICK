export default function PickDisplay({ grid, playerInputs, picks, animationClasses, highlights}) {
    const { gridBlue, gridRed } = grid;
    const { blue: bluePlayers, red: redPlayers } = playerInputs
    const { blue: bluePicks, red: redPicks } = picks
    const { blue: animationBlueClass, red: animationRedClass } = animationClasses;
    const { blue: highlightBlueClass, red: highlightRedClass } = highlights;
    const pickBlueId = [1, 2, 3, 4, 5];
    const pickRedId = [6, 7, 8, 9, 10];
    
    const renderPicks = (ids, player, picks, animationClass, highlight) => {
        return ids.map((id) => (
            <div className="flex flex-col" key={id}>
                <div className="bg-yellow-100 bg-cover bg-center border-x-2 w-29 h-45 overflow-hidden">
                    <img className={`w-full object-cover ${animationClass[(id - 1) % 5]}`} src={picks[(id - 1) % 5].img} alt="" />
                </div>
                <div className={`flex justify-center items-center h-8 text-white ${highlight[(id - 1) % 5] ? 'bg-amber-700' : 'bg-cyan-950'}`}>
                    {player[(id - 1) % 5]}
                </div>
            </div>
        ));
    };

    return (
        <>
            <div className={`flex ${gridBlue}`}>
                {renderPicks(pickBlueId, bluePlayers, bluePicks, animationBlueClass, highlightBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${gridRed}`}>
                {renderPicks(pickRedId, redPlayers, redPicks, animationRedClass, highlightRedClass)}
            </div>
        </>
    );
}
