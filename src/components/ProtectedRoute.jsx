import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabaseMLBB } from "../lib/supabaseClients";

export default function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabaseMLBB.auth.getSession();
            setUser(data.session?.user || null);
            setLoading(false);
        };
        getSession();
    }, []);

    if (loading) return <div>Loading...</div>;

    return user ? children : <Navigate to="/login" replace />;
}
