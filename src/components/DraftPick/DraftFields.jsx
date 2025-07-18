import TeamField from "./Team/TeamField";
import PlayerField from "./Player/PlayerField";
import BanField from "./Ban/BanField";
import PickField from "./Pick/PickField";

export default function DraftFields() {
    return (
        <div className="flex gap-8">
            <TeamField />
            <PlayerField />
            <BanField />
            <PickField />
        </div>
    );
}
