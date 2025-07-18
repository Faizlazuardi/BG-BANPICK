import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "/src/assets/LogoBinusianGaming.png";
import { supabaseMLBB } from "../lib/supabaseClients";

export default function sideBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        supabaseMLBB.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabaseMLBB.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        const { error } = await supabaseMLBB.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
        } else {
            navigate("/", { replace: true });
        }
    };

    return (
        <nav className="flex flex-col items-center bg-amber-400 pt-8 pb-20 w-50 h-screen">
            <div className="flex justify-center my-4 w-full">
                <img className="w-20 h-fit" src={logo} alt="Logo" />
            </div>
            <div className="flex flex-col justify-between gap-4 h-full">
                <div className="flex flex-col gap-4">
                    <Link
                        to="/"
                        className={`font-semibold text-lg transition hover:text-cyan-950 ${isActive('/') ? 'text-gray-900' : 'text-amber-900'
                            }`}
                    >
                        DraftPick
                    </Link>
                    <Link
                        to="/roaster"
                        className={`font-semibold text-lg transition hover:text-cyan-950 ${isActive('/roaster') ? 'text-gray-900' : 'text-amber-900'
                            }`}
                    >
                        Roaster Manager
                    </Link>
                </div>
                {session && (
                    <p className="mx-auto font-semibold text-red-500 text-lg hover:cursor-pointer" onClick={handleLogout}>Logout</p>
                )}
            </div>
        </nav>
    );
}
