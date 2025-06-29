import { Link, useLocation } from 'react-router-dom';
import logo from "/src/assets/LogoBinusianGaming.png";

export default function sideBar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (
        <nav className="flex flex-col items-center bg-amber-400 w-50 h-screen">
            <div className="flex justify-center my-4 w-full">
                <img className="w-20 h-fit" src={logo} alt="Logo" />
            </div>
            <div className="flex flex-col gap-4 mt-8">
                <Link
                    to="/"
                    className={`font-semibold text-lg transition hover:text-cyan-950 ${
                    isActive('/') ? 'text-gray-900' : 'text-amber-900'
                    }`}
                >
                    DraftPick
                </Link>
                <Link
                    to="/roaster"
                    className={`font-semibold text-lg transition hover:text-cyan-950 ${
                    isActive('/roaster') ? 'text-gray-900' : 'text-amber-900'
                    }`}
                >
                    Roaster Manager
                </Link>
            </div>
        </nav>
    );
}
