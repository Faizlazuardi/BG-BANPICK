import { useDraftContext } from "../../../contexts/DraftContext";

export default function teamDisplay({ grid }) {
    const { teamSelection } = useDraftContext()
    return (
        <>
            <h1 className={`flex justify-center items-center bg-amber-700 w-full text-center text-4xl ${grid.Blue}`}>{teamSelection.blue.Name}</h1>
            <h1 className={`flex justify-center items-center bg-amber-700 w-full text-center text-4xl ${grid.Red}`}>{teamSelection.red.Name}</h1>
        </>
    )
}