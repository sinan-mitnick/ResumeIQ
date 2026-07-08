import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import api from "../api/api";
import { useAuth } from "../context/authContext";

export default function VerifyEmail() {

    const { login } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const email = state?.email || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const verifyOTP = async () => {

        try {

            setLoading(true);
            setMessage("");

            const res = await api.post(
                "/auth/verify-register-otp",
                {
                    email,
                    otp,
                }
            );

            login(
                res.data.user,
                res.data.token
            );

            navigate("/dashboard");

        }

        catch (err) {

            setMessage(
                err.response?.data?.message ||
                "Invalid OTP"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">

                <div className="flex justify-center">

                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">

                        <ShieldCheck
                            className="text-green-600"
                            size={36}
                        />

                    </div>

                </div>

                <h1 className="text-4xl font-black text-center mt-6">

                    Verify Your Email

                </h1>

                <p className="text-center text-slate-500 mt-4">

                    Enter the 6-digit verification code sent to

                </p>

                <p className="text-center font-bold text-blue-600 mt-2">

                    {email}

                </p>

                <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="mt-8 w-full rounded-xl border border-slate-300 px-5 py-4 text-center text-2xl tracking-[8px] outline-none focus:border-blue-600"
                />

                {message && (

                    <p className="mt-5 text-center text-red-600">

                        {message}

                    </p>

                )}

                <button
                    onClick={verifyOTP}
                    disabled={loading}
                    className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-white font-semibold"
                >

                    {loading
                        ? "Verifying..."
                        : "Verify Email"}

                </button>

            </div>

        </div>

    );

}