import TournamentLogo from '/src/assets/TournamentLogo.png';

import { useGameContext } from '../../contexts/GameContext';
import { useDraftContext } from '../../contexts/DraftContext';

export default function MatchSummary({ grid }) {
    const { requiredWins, selectedRound} = useGameContext();
    const { teamSelection } = useDraftContext()
    const { blue: blueTeamSelection, red: redTeamSelection } = teamSelection;
    const winCard = (team, teamSelection, style) => {
        return (
            <div className="flex flex-col items-center gap-3">
                <img className="w-20 h-20" id={`logo-${team}`} src={teamSelection.Logo} alt="" />
                <div className={`flex justify-center gap-2.5 h-5 ${style}`}>
                    {Array.from({ length: requiredWins }).map((_, index) => (
                        <div key={index} className={`border-2 w-5 h-5 ${teamSelection.WinCheck[index] ? 'bg-black' : 'bg-white'}`} />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className={`flex flex-col justify-center gap-2 bg-amber-400 w-85 h-69 ${grid}`}>
            <div className="mx-auto max-w-40 max-h-22">
                <img className="w-full h-full" src={TournamentLogo} alt="Tournament Logo" />
            </div>
            <h1 className="text-2xl text-center">{selectedRound}</h1>
            <div className="flex justify-evenly">
                {winCard("blue", blueTeamSelection)}
                {winCard("red", redTeamSelection, "flex-row-reverse")}
            </div>
        </div>
    );
}