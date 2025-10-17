import TeamDisplay from "./Team/TeamDisplay";
import PlayerDisplay from "./Player/PlayerDisplay";
import PickDisplay from "./Pick/PickDisplay";
import BanDisplay from "./Ban/BanDisplay";
import MatchSummary from "./MatchSummary";

export default function DraftDisplay() {
    const layoutGrid = {
        Team: { Blue: "col-start-1 row-start-1", Red: "col-start-5 row-start-1" },
        Ban: { Blue: "col-start-2 row-start-1", Red: "col-start-4 row-start-1" },
        Pick: { Blue: "col-span-2 col-start-1 row-start-2", Red: "col-span-2 col-start-4 row-start-2" },
        Player: { Blue: "col-span-2 col-start-1 row-start-3", Red: "col-span-2 col-start-4 row-start-3" },
        Summary: "col-start-3 row-span-3 row-start-1"
    }
    return (
        <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] grid-rows-[auto]">
            <TeamDisplay grid={layoutGrid.Team} />
            <BanDisplay
                grid={layoutGrid.Ban}
            />
            <PickDisplay
                grid={layoutGrid.Pick}
            />
            <PlayerDisplay
                grid={layoutGrid.Player}
            />
            <MatchSummary grid={layoutGrid.Summary} />
        </div>
    );
}