import TournamentLogo from '/src/assets/TournamentLogo.gif';

export default function MatchSummary({ round, teamInput, grid }) {
    const { blue: blueTeamInput, red: redTeamInput } = teamInput;
    const winCard = (team, teamInput, style) => {
        return (
            <div className="flex flex-col justify-center gap-3">
                <img className="w-20 h-20" id={`logo-${team}`} src={teamInput.Logo} alt={`${teamInput.Name} Logo`} />
                <div className={`flex justify-center gap-2.5 w-20 h-5 ${style}`}>
                    {[1, 2, 3].map((num) => (
                        <div key={num} className={`border-2 w-5 h-5 ${teamInput.WinCheck[num - 1] ? 'bg-black' : ''}`} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col justify-center gap-2 w-85 h-69 ${grid}`}>
            <div className="mx-auto max-w-40 max-h-22.5">
                <img src={TournamentLogo} alt="Tournament Logo" />
            </div>
            <h1 className="text-2xl text-center">{round}</h1>
            <div className="flex justify-evenly">
                {winCard("blue", blueTeamInput, "")}
                {winCard("red", redTeamInput, "flex-row-reverse")}
            </div>
        </div>
    );
}