import { TEAM_SIZE } from '../../../constants/gameConstant';

import { useDraftContext } from '../../../contexts/DraftContext';

export default function PlayerDisplay({ grid }){
    const { playerInputs, highlights } = useDraftContext()
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
            <div className={`flex ${grid.Blue}`}>
                {renderPlayers(bluePlayers, highlightBlueClass)}
            </div>
            <div className={`flex flex-row-reverse ${grid.Red}`}>
                {renderPlayers(redPlayers, highlightRedClass)}
            </div>
        </>
    );
}