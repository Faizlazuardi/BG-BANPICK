export default function teamDisplay( { grid, teams } ) {
    const { gridBlue, gridRed } = grid;
    const { blue: blueTeam, red: redTeam } = teams;
    return (
        <>
            <h1 className={`flex justify-center items-center bg-blue-500 w-65 text-center text-4xl ${gridBlue}`}>{blueTeam}</h1>
            <h1 className={`flex justify-center items-center bg-red-500 w-65 text-center text-4xl ${gridRed}`}>{redTeam}</h1>
        </>
    )
}