import { TEAM_SIZE } from '../../../constants/gameConstant';

import { useDraftContext } from '../../../contexts/DraftContext';

export default function PlayerDisplay({ grid }){
    const { playerInputs, highlights } = useDraftContext()
    const { blue: bluePlayers, red: redPlayers } = playerInputs
    const { blue: highlightBlueClass, red: highlightRedClass } = highlights;
    
    const renderPlayers = (player, highlight) => {
        return Array.from({ length: TEAM_SIZE }).map((_, index) => (
            <div className={`flex justify-center items-center h-8 w-29 text-white ${highlight[index] ? 'bg-[#289132]' : 'bg-[#00C92A]'}`} key={index}>
                {player[index]}
            </div>
        ));
    };
    return (
        <>
            <div className={`flex w-fit ${grid.Blue}`}>
                {renderPlayers(bluePlayers, highlightBlueClass)}
            </div>
            <div className={`flex flex-row-reverse w-fit ${grid.Red}`}>
                {renderPlayers(redPlayers, highlightRedClass)}
            </div>
        </>
    );
}