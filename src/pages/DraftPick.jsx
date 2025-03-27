import { useState, useEffect } from "react";
import TeamDisplay from "/src/components/TeamDisplay.jsx";
import BanDisplay from "/src/components/BanDisplay.jsx";
import PickDisplay from "/src/components/PickDisplay.jsx";
import MatchSummary from "/src/components/MatchSummary";
import TeamField from "/src/components/TeamField";
import BanField from "/src/components/BanField";
import PickField from "/src/components/PickField";
import PlayerField from "/src/components/PlayerField";
import { getHeroes } from "../../services/heroService";
import { getTeams } from "../../services/teamService";
import { getPlayersByTeam } from "../../services/playerService";

export default function DraftPick() {
    const HOK = [
        {Name: "Agudo", Picked: null, Banned: null},
        {Name: "Alessio", Picked: null, Banned: null},
        {Name: "Allain", Picked: null, Banned: null},
        {Name: "Angela", Picked: null, Banned: null},
        {Name: "Arke", Picked: null, Banned: null},
        {Name: "Arli", Picked: null, Banned: null},
        {Name: "Arthur", Picked: null, Banned: null},
        {Name: "Ata", Picked: null, Banned: null},
        {Name: "Athena", Picked: null, Banned: null},
        {Name: "Augran", Picked: null, Banned: null},
        {Name: "Biron", Picked: null, Banned: null},
        {Name: "Butterfly", Picked: null, Banned: null},
        {Name: "Cai Yan", Picked: null, Banned: null},
        {Name: "Charlotte", Picked: null, Banned: null},
        {Name: "Cirrus", Picked: null, Banned: null},
        {Name: "Consort Yu", Picked: null, Banned: null},
        {Name: "Da Qiao", Picked: null, Banned: null},
        {Name: "Daji", Picked: null, Banned: null},
        {Name: "Dharma", Picked: null, Banned: null},
        {Name: "Di Renjie", Picked: null, Banned: null},
        {Name: "Dian Wei", Picked: null, Banned: null},
        {Name: "Diaochan", Picked: null, Banned: null},
        {Name: "Dolia", Picked: null, Banned: null},
        {Name: "Donghuang", Picked: null, Banned: null},
        {Name: "Dr Bian", Picked: null, Banned: null},
        {Name: "Dun", Picked: null, Banned: null},
        {Name: "Dyadia", Picked: null, Banned: null},
        {Name: "Erin", Picked: null, Banned: null},
        {Name: "Fang", Picked: null, Banned: null},
        {Name: "Feyd", Picked: null, Banned: null},
        {Name: "Fuzi", Picked: null, Banned: null},
        {Name: "Gan & Mo", Picked: null, Banned: null},
        {Name: "Gao", Picked: null, Banned: null},
        {Name: "Garo", Picked: null, Banned: null},
        {Name: "Guan Yu", Picked: null, Banned: null},
        {Name: "Guiguzi", Picked: null, Banned: null},
        {Name: "Hanxin", Picked: null, Banned: null},
        {Name: "Heino", Picked: null, Banned: null},
        {Name: "Hou yi", Picked: null, Banned: null},
        {Name: "Huang Zhong", Picked: null, Banned: null},
        {Name: "Jing", Picked: null, Banned: null},
        {Name: "Kaizer", Picked: null, Banned: null},
        {Name: "Kongming", Picked: null, Banned: null},
        {Name: "Kui", Picked: null, Banned: null},
        {Name: "Lady Sun", Picked: null, Banned: null},
        {Name: "Lady Zen", Picked: null, Banned: null},
        {Name: "Lam", Picked: null, Banned: null},
        {Name: "Li Xin", Picked: null, Banned: null},
        {Name: "Lian Po", Picked: null, Banned: null},
        {Name: "Liang", Picked: null, Banned: null},
        {Name: "Liu Bang", Picked: null, Banned: null},
        {Name: "Liu Bei", Picked: null, Banned: null},
        {Name: "Liu Shan", Picked: null, Banned: null},
        {Name: "Loong", Picked: null, Banned: null},
        {Name: "Lubu", Picked: null, Banned: null},
        {Name: "Luara", Picked: null, Banned: null},
        {Name: "Luban No. 7", Picked: null, Banned: null},
        {Name: "Luna", Picked: null, Banned: null},
        {Name: "Mai Shiranui", Picked: null, Banned: null},
        {Name: "Marco Polo", Picked: null, Banned: null},
        {Name: "Mayene", Picked: null, Banned: null},
        {Name: "Meng Ya", Picked: null, Banned: null},
        {Name: "Menki", Picked: null, Banned: null},
        {Name: "Mi Yue", Picked: null, Banned: null},
        {Name: "Milady", Picked: null, Banned: null},
        {Name: "Ming", Picked: null, Banned: null},
        {Name: "Mozi", Picked: null, Banned: null},
        {Name: "Mulan", Picked: null, Banned: null},
        {Name: "Musashi", Picked: null, Banned: null},
        {Name: "Nakoruru", Picked: null, Banned: null},
        {Name: "Nezha", Picked: null, Banned: null},
        {Name: "Nuwa", Picked: null, Banned: null},
        {Name: "Pei", Picked: null, Banned: null},
        {Name: "Prince of Lanling", Picked: null, Banned: null},
        {Name: "Princess frost", Picked: null, Banned: null},
        {Name: "Sakeer", Picked: null, Banned: null},
        {Name: "Shangguang", Picked: null, Banned: null},
        {Name: "Shi", Picked: null, Banned: null},
        {Name: "Shouyue", Picked: null, Banned: null},
        {Name: "Sima Yi", Picked: null, Banned: null},
        {Name: "Sun Bin", Picked: null, Banned: null},
        {Name: "Sun Ce", Picked: null, Banned: null},
        {Name: "Ukyo Tachibana", Picked: null, Banned: null},
        {Name: "Wukong", Picked: null, Banned: null},
        {Name: "Wuyan", Picked: null, Banned: null},
        {Name: "Xiang Yu", Picked: null, Banned: null},
        {Name: "Xiao Qiao", Picked: null, Banned: null},
        {Name: "Xuance", Picked: null, Banned: null},
        {Name: "Yang Jian", Picked: null, Banned: null},
        {Name: "Yao", Picked: null, Banned: null},
        {Name: "Yaria", Picked: null, Banned: null},
        {Name: "Ying", Picked: null, Banned: null},
        {Name: "Yixing", Picked: null, Banned: null},
        {Name: "Yuhuan", Picked: null, Banned: null},
        {Name: "Zhang Fei", Picked: null, Banned: null},
        {Name: "Zhou Yu", Picked: null, Banned: null},
        {Name: "Zhuangzi", Picked: null, Banned: null},
        {Name: "Zilong", Picked: null, Banned: null},
        {Name: "Ziya", Picked: null, Banned: null},
    ]

    const gameOption = [
        { id: "1", game: "MLBB"},
        { id: "2", game: "HOK"}
    ]

    const [heroes, setHeroes] = useState([]);
    const [teams, setTeams] = useState([]);

    const gameStats = async (game) => {
        if (game === "MLBB") {
            const hero = await getHeroes(game);
            if (!hero.error) {
                setHeroes(hero);
            }
            
            const team = await getTeams(game);
            if (!team.error) {
                setTeams(team);
            }
        }
        if (game === "HOK") {
            setHeroes(HOK);
        }
    };

    useEffect(() => {
        const fetchDefaultGameStats = async () => {
            const data = await getHeroes("MLBB");
            if (!data.error) {
                setHeroes(data);
            }
            
            const team = await getTeams("MLBB");
            if (!team.error) {
                setTeams(team);
            }
        };
        fetchDefaultGameStats();
    }, []);

    const roundOption = [
        { id: "1", round: "Quarterfinals" },
        { id: "2", round: "Semifinals" },
        { id: "3", round: "Bronze Match" },
        { id: "4", round: "Grand Final" }
    ];

    const [rounds, setRounds] = useState(roundOption[0].round);

    const initialPickState = {
        blue: Array(5).fill({ Name: "", img: null }),
        red: Array(5).fill({ Name: "", img: null })
    };
    
    const initialInputPickState = {
        blue: Array(5).fill(""),
        red: Array(5).fill("")
    };
    
    const initialBanState = {
        blue: Array(5).fill({ Name: "", img: null }),
        red: Array(5).fill({ Name: "", img: null })
    };
    
    const initialInputBanState = {
        blue: Array(5).fill(""),
        red: Array(5).fill("")
    };
    
    const initialTeamSelectionState = {
        blue: { Name: "", Logo: "./src/assets/80x80.png", WinCheck: [false, false, false] },
        red: { Name: "", Logo: "./src/assets/80x80.png", WinCheck: [false, false, false] }
    };
    
    const initialTeamInputState = {
        blue: "",
        red: ""
    };
    
    const initialplayerInputState = {
        blue: Array(5).fill(""),
        red: Array(5).fill("")
    };

    const initialplayersState = {
        blue: [],
        red: []
    };

    const [picks, setPicks] = useState(initialPickState);
    const [bans, setBans] = useState(initialBanState);
    const [teamSelection, setTeamSelection] = useState(initialTeamSelectionState);

    const [pickInputs, setPickInputs] = useState(initialInputPickState);
    const [banInputs, setBanInputs] = useState(initialInputBanState);
    const [playerInputs, setPlayerInputs] = useState(initialplayerInputState);
    const [teamInputs, setTeamInputs] = useState(initialTeamInputState);

    const [players, setPlayers] = useState(initialplayersState);

    const updateMatchData = (type, team, id, value) => {
        const setState = {
            pick: setPicks,
            ban: setBans
        }[type];
        
        if (setState) {
            setState(prev => ({
                ...prev,
                [team]: prev[team].map((item, i) => (i === id ? value : item))
            }));
            return;
        }
        
        const setInputState = {
            pickInput: setPickInputs,
            banInput: setBanInputs,
            playerInput: setPlayerInputs
        }[type];
        
        if (setInputState) {
            setInputState(prev => ({
                ...prev,
                [team]: prev[team].map((item, i) => (i === id ? value : item))
            }));
        }
    };

    useEffect(() => {
        ['blue', 'red'].forEach(team => {
            const teamPlayers = async () => {
                if (!teamSelection[team].Name) return;
                const data = await getPlayersByTeam(teamSelection[team].Name);
                if (!data.error) {
                    setPlayers(prevPlayers => ({
                        ...prevPlayers,
                        [team]: data
                    }));
                }
            };
            teamPlayers();
        });
    }, [teamSelection]);
    

    const handleTeamChange = (team, {name, logo}) => {
        setTeamSelection(prev => ({
            ...prev,
            [team]: {
                ...prev[team],
                Name: name,
                Logo: logo
            }
        }));
    };

    const handleTeamNameInputChange = (team, value) => {
        setTeamInputs(prev => ({
            ...prev,
            [team]: value
        }));
    };

    const handleWinCheckChange = (team, index) => {
        setTeamSelection(prev => {
            const newWinCheck = [...prev[team].WinCheck];
            newWinCheck[index] = !newWinCheck[index];
            return {
                ...prev,
                [team]: {
                    ...prev[team],
                    WinCheck: newWinCheck
                }
            };
        });
    };

    const initialAnimationState = {
        pick: {
            red: Array(5).fill(""),
            blue: Array(5).fill("")
        },
        ban: {
            red: Array(5).fill(""),
            blue: Array(5).fill("")
        }
    };
    
    const [animationClasses, setAnimationClasses] = useState(initialAnimationState);

    const animationFlyIn = (type, team, id) => {
        setAnimationClasses(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [team]: prev[type][team].map((item, i) => (i === id ? "fly-in" : item))
            }
        }));
    };

    const animationFlyOut = (type, team, id) => {
        setAnimationClasses(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [team]: prev[type][team].map((item, i) => (i === id ? "fly-out" : item))
            }
        }));
    }

    const animationDisplay = (type, team, id, value) => {
        let flyOutTimeout, flyInTimeout;
        let display = type === "pick" ? picks[team][id] : bans[team][id];
        
        if (display && display.img) {
            animationFlyOut(type, team, id)
            flyOutTimeout = setTimeout(() => {
                updateMatchData(type, team, id, value);
                animationFlyIn(type, team, id)
                flyInTimeout = setTimeout(() => {
                    setAnimationClasses(initialAnimationState);
                }, 1200);
            }, 1200);
        } else {
            updateMatchData(type, team, id, value);
            animationFlyIn(type, team, id)
            flyInTimeout = setTimeout(() => {
                setAnimationClasses(initialAnimationState);
            }, 1200);
        }
        return () => {
            if (flyOutTimeout) clearTimeout(flyOutTimeout);
            if (flyInTimeout) clearTimeout(flyInTimeout);
        };
    };

    const shiftPick = (team, id) => {
        let shiftId = id;
        
        while (shiftId > 0 && picks[team][shiftId - 1].img === null) {
            shiftId--;
        }
        
        if (shiftId !== id) {
            [pickInputs[team][shiftId], pickInputs[team][id]] = [pickInputs[team][id], pickInputs[team][shiftId]];
            [playerInputs[team][shiftId], playerInputs[team][id]] = [playerInputs[team][id], playerInputs[team][shiftId]];
            return shiftId;
        }
        return id;
    }

    const initialSwaperState = {
        blue: Array(5).fill(false),
        red: Array(5).fill(false)
    };

    const [swaper, setSwaper] = useState(initialSwaperState)

    const handleSwaperChange = (team, index) => {
        setSwaper(prev => {
            const newSwaper = [...prev[team]];
            newSwaper[index] = !newSwaper[index];
            return {
                ...prev,
                [team]: newSwaper
            };
        });
    };

    const swapPick = (team) => {
        let flyOutTimeout, flyInTimeout;
        
        const ids = swaper[team].reduce((acc, value, index) => {
            if (value) acc.push(index);
            return acc;
        }, []);
        
        if (ids.length === 2) {
            const [id1, id2] = ids;
            
            animationFlyOut("pick", team, id1);
            animationFlyOut("pick", team, id2);
            
            flyOutTimeout = setTimeout(() => {
                setPicks(prev => ({
                    ...prev,
                    [team]: prev[team].map((item, i) => {
                        if (i === id1) return prev[team][id2];
                        else if (i === id2) return prev[team][id1];
                        return item;
                    })
                }));
                
                setPickInputs(prev => ({
                    ...prev,
                    [team]: prev[team].map((item, i) => {
                        if (i === id1) return prev[team][id2];
                        else if (i === id2) return prev[team][id1];
                        return item;
                    })
                }));
                
                animationFlyIn("pick", team, id1);
                animationFlyIn("pick", team, id2);
            }, 1200);
            
            setSwaper(prev => ({
                ...prev,
                [team]: prev[team].map((item, i) => (i === id1 || i === id2 ? false : item))
            }));
            
            return () => {
                if (flyOutTimeout) clearTimeout(flyOutTimeout);
                if (flyInTimeout) clearTimeout(flyInTimeout);
            };
        }
    };

    useEffect(() => {
        ["blue", "red"].forEach(team => {
            const cleanup = swapPick(team);
            return () => cleanup;
        });
    }, [swaper.blue, swaper.red]);
    

    const resetPickandBan = () => {
        setAnimationClasses(prev => ({
            ...prev,
            pick: Object.fromEntries(Object.entries(prev.pick).map(([team]) => [team, Array(5).fill("fly-out")])),
            ban: Object.fromEntries(Object.entries(prev.ban).map(([team]) => [team, Array(5).fill("fly-out")]))
        }));        

        const flyOutTimeout = setTimeout(() => {
            setPicks(initialPickState);
            setPickInputs(initialInputPickState);
            setBans(initialBanState);
            setBanInputs(initialInputBanState);
            setAnimationClasses(initialAnimationState);
        }, 1200);
    
        return () => clearTimeout(flyOutTimeout);
    };

    const resetTeam = () => {
        setPlayerInputs(initialplayerInputState);
        setTeamSelection(initialTeamSelectionState);
        setTeamInputs(initialTeamInputState)
        setPlayers(initialplayersState);
    };

    const switchTeam = () => {
        setPlayerInputs(prev => ({
            blue: prev.red,
            red: prev.blue
        }));
        setTeamSelection(prev => ({
            blue: prev.red,
            red: prev.blue
        }));
    };

    return (
        <main className="flex flex-col flex-grow items-center gap-10 mt-10">
            <div className="grid grid-cols-[auto] grid-rows-[auto]">
                <TeamDisplay
                    grid={{ gridBlue: "col-start-1 row-start-1", gridRed: "col-start-5 row-start-1" }}
                    teams={{ blue: teamSelection.blue.Name, red: teamSelection.red.Name }}
                />
                <BanDisplay
                    grid={{ gridBlue: "col-start-2 row-start-1", gridRed: "col-start-4 row-start-1" }}
                    bans={bans}
                    animationClasses={animationClasses.ban}
                />
                <PickDisplay
                    grid={{ gridBlue: "col-span-2 col-start-1 row-start-2", gridRed: "col-span-2 col-start-4 row-start-2" }}
                    playerInputs={playerInputs}
                    picks={picks}
                    animationClasses={animationClasses.pick}
                />
                <MatchSummary
                grid="col-start-3 row-span-2 row-start-1"
                    round={rounds}
                    teamInputs={teamSelection}
                />
            </div>

            <div className="flex flex-col items-center gap-5">
                <div className="flex gap-3">
                    <select id="round" className="p-2 border-2 w-35 h-11 text-center" onChange={(e) => setRounds(e.target.value)}>
                        {roundOption.map(({ id, round }) => (
                            <option value={round} key={id}>{round}</option>
                        ))}
                    </select>
                    <select id="Games" className="p-2 border-2 w-35 h-11 text-center" onChange={(e) => gameStats(e.target.value)}>
                        {gameOption.map(({ id, game }) => (
                            <option value={game} key={id}>{game}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3">
                    <button className="w-30" id="switch-team" onClick={switchTeam}>Switch Team</button>
                    <button className="w-45" id="reset-dropdowns" onClick={resetPickandBan}>Reset Pick and Ban</button>
                    <button className="w-30" id="reset-team" onClick={resetTeam}>Reset Team</button>
                </div>
            </div>

            <div className="flex gap-9">
                <TeamField
                    onTeamChange={{
                        onTeamNameChange: handleTeamChange,
                        onWinCheckChange: handleWinCheckChange
                    }}
                    teamSelection={teamSelection}
                    teamInputs={teamInputs}
                    onTeamInputChange={handleTeamNameInputChange}
                    teams={teams}
                />
                <PlayerField
                    onPlayerChange={(team, id, value) => updateMatchData("playerInput", team, id, value)}
                    playerInputs={playerInputs}
                    players={players}
                />
                <BanField
                    onBanChange={animationDisplay}
                    onBanInputChange={(team, id, hero) => updateMatchData("banInput", team, id, hero)}
                    banInputs={banInputs}
                    heroes={heroes}
                />
                <PickField
                    onPickChange={animationDisplay}
                    onPickInputChange={(team, id, hero) => updateMatchData("pickInput", team, id, hero)}
                    pickInputs={pickInputs}
                    heroes={heroes}
                    onShiftPick={shiftPick}
                    swaper={swaper}
                    onSwaperChange={handleSwaperChange}
                />
            </div>
        </main>
    );
}