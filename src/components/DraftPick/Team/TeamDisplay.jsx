import { useDraftContext } from "../../../contexts/DraftContext";

export default function teamDisplay( { grid } ) {
    const { teamSelection } = useDraftContext()
    return (
        <>
            <h1 className={`flex justify-center items-center bg-[#377DD8] w-full h-16 text-center text-4xl ${grid.Blue}`}>{teamSelection.blue.Name}</h1>
            <h1 className={`flex justify-center items-center bg-[#FF0000] w-full h-16 text-center text-4xl ${grid.Red}`}>{teamSelection.red.Name}</h1>
        </>
    )
}