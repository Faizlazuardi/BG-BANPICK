import { TEAM_SIZE } from '../constants/gameConstant';

export default function PlayerDisplay({grid, playerInputs, highlights}){
    const { gridBlue, gridRed } = grid;
    const { blue: bluePlayers, red: redPlayers } = playerInputs
    const { blue: highlightBlueClass, red: highlightRedClass } = highlights;
    
    const renderPlayers = (player, highlight) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => (
            <div className={`flex justify-center items-center h-8 w-29 text-white ${highlight[index] ? 'bg-amber-700' : 'bg-cyan-950'}`} key={index}>
                {player[index]}
            </div>
        ));
    };
    return (
        <>
            <div className={`flex ${gridBlue}`}>
                {renderPlayers(bluePlayers, highlightBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${gridRed}`}>
                {renderPlayers(redPlayers, highlightRedClass)}
            </div>
        </>
    );
}