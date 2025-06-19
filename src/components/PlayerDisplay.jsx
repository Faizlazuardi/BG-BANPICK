export default function PlayerDisplay({grid, playerInputs, highlights}){
    const { gridBlue, gridRed } = grid;
    const { blue: bluePlayers, red: redPlayers } = playerInputs
    const { blue: highlightBlueClass, red: highlightRedClass } = highlights;
    const playerBlueId = [1, 2, 3, 4, 5];
    const playerRedId = [6, 7, 8, 9, 10];
    
    const renderPlayers = (ids, player, highlight) => {
        return ids.map((id) => (
            <div className={`flex justify-center items-center h-8 w-29 text-white ${highlight[(id - 1) % 5] ? 'bg-amber-700' : 'bg-cyan-950'}`} key={id}>
                {player[(id - 1) % 5]}
            </div>
        ));
    };
    return (
        <>
            <div className={`flex ${gridBlue}`}>
                {renderPlayers(playerBlueId, bluePlayers, highlightBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${gridRed}`}>
                {renderPlayers(playerRedId, redPlayers, highlightRedClass)}
            </div>
        </>
    );
}