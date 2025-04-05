import { Link } from 'react-router-dom';
import logo from "/src/assets/LogoBinusianGaming.png";

export default function sideBar() {
    return (
        <nav className="flex flex-col items-center bg-orange-500 w-50 h-screen">
            <div className="flex justify-center my-4 w-full">
                <img className="h-20" src={logo} alt="Logo" />
            </div>
            <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="font-semibold text-white hover:text-black text-lg transition">
                    Roaster Manager
                </Link>
                <Link to="/draftpick" className="font-semibold text-white hover:text-black text-lg transition">
                    Draft Pick
                </Link>
            </div>
        </nav>
    );
}
