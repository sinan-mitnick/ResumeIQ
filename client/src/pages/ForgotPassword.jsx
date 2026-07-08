import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ShieldCheck, Lock } from "lucide-react";
import api from "../api/api";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 const sendOTP = async () => {
    try {
        setLoading(true);
        setMessage("");

        console.log("Sending OTP request...");

        const res = await api.post("/auth/forgot-password", {
            email,
        });

        console.log("SUCCESS:", res.data);

        setStep(2);

    } catch (err) {

        console.log("FULL ERROR:", err);

        if (err.response) {
            console.log("STATUS:", err.response.status);
            console.log("DATA:", err.response.data);
            setMessage(err.response.data.message || "Failed to send OTP");
        } else {
            console.log("NO RESPONSE:", err.message);
            setMessage(err.message);
        }

    } finally {
        setLoading(false);
    }
};
const verifyOTP = async () => {
    try {

        setLoading(true);
        setMessage("");

        const res = await api.post("/auth/verify-otp", {
            email,
            otp,
        });

        console.log(res.data);

        setStep(3);

    } catch (err) {

        console.log(err);

        setMessage(
            err.response?.data?.message || "Invalid OTP"
        );

    } finally {

        setLoading(false);

    }
};
 const resetPassword = async () => {

    if (password !== confirm) {
        return setMessage("Passwords do not match");
    }

    try {

        setLoading(true);
        setMessage("");

        const res = await api.post("/auth/reset-password", {
            email,
            password,
        });

        console.log(res.data);

        setStep(4);

    } catch (err) {

        console.log(err);

        setMessage(
            err.response?.data?.message || "Reset failed"
        );

    } finally {

        setLoading(false);

    }

};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">

        {step === 1 && (
          <>
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="text-blue-600" size={36}/>
              </div>
            </div>

            <h1 className="text-4xl font-black text-center mt-6">
              Forgot Password?
            </h1>

            <p className="text-center text-slate-500 mt-3">
              Enter your email to receive a verification code.
            </p>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-8 w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
            />

            <button
              onClick={sendOTP}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-white font-semibold"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <ShieldCheck className="text-green-600" size={36}/>
              </div>
            </div>

            <h1 className="text-4xl font-black text-center mt-6">
              Verify OTP
            </h1>

            <p className="text-center text-slate-500 mt-3">
              Enter the 6-digit code sent to
            </p>

            <p className="text-center font-semibold mt-1">
              {email}
            </p>

            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              className="mt-8 w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-blue-600"
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-white font-semibold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-violet-100 flex items-center justify-center">
                <Lock className="text-violet-600" size={36}/>
              </div>
            </div>

            <h1 className="text-4xl font-black text-center mt-6">
              Reset Password
            </h1>

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="mt-8 w-full rounded-xl border border-slate-300 px-5 py-4"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e)=>setConfirm(e.target.value)}
              className="mt-5 w-full rounded-xl border border-slate-300 px-5 py-4"
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-white font-semibold"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <div className="text-center">
              <div className="text-6xl">🎉</div>

              <h1 className="text-4xl font-black mt-5">
                Password Updated
              </h1>

              <p className="text-slate-500 mt-4">
                Your password has been changed successfully.
              </p>

              <Link
                to="/login"
                className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}

        {message && (
          <p className="mt-6 text-center text-red-600">
            {message}
          </p>
        )}

        {step !== 4 && (
          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}