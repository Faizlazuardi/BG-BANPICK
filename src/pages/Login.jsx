import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseMLBB } from "../lib/supabaseClients";

export default function Login() {
    const navigate = useNavigate();
    const [FormField, setFormField] = useState({ email: "", password: "" });

    const handleFormField = (Field, value) => {
        setFormField((prev) => ({
            ...prev,
            [Field]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data, error } = await supabaseMLBB.auth.signInWithPassword({
            email: FormField.email,
            password: FormField.password,
        });

        if (error) {
            alert("Login gagal: " + error.message);
            return;
        }
        navigate("/roaster");
        return data;
    };

    return (
        <div className="flex flex-col justify-center items-center gap-10 bg-gray-100 w-screen h-screen">
            <h1 className="font-bold text-3xl">Sign in to your account</h1>

            <div className="flex flex-col gap-5">
                <form
                    className="flex flex-col gap-4 bg-white p-8 border-2 rounded-lg w-128 h-90"
                    onSubmit={handleLogin}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="email">Email</label>
                        <input
                            className="p-2 border-2 rounded-md w-110 h-10"
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            placeholder="Enter Your Email"
                            required
                            onChange={(e) => handleFormField("email", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="password">Password</label>
                        <input
                            className="p-2 border-2 rounded-md w-110 h-10"
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            placeholder="Enter Your Password"
                            required
                            onChange={(e) => handleFormField("password", e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-black disabled:bg-gray-500 rounded-md w-110 h-10 text-white hover:cursor-pointer"
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}