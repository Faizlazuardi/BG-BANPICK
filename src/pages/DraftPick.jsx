import DraftDisplay from "../components/DraftPick/DraftDisplay";
import DraftControls from "../components/DraftPick/DraftControls";
import DraftFields from "../components/DraftPick/DraftFields";

export default function DraftPick() {
    return (
        <main className="flex flex-col flex-grow items-center gap-10 mt-10">
            <DraftDisplay/>
            <DraftControls/>
            <DraftFields/>
        </main>
    );
}
