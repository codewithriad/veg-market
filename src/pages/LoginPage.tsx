import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

type AuthMode = "login" | "signup";
type AuthStep = "phone" | "otp";

const LoginPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [step, setStep] = useState<AuthStep>("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handlePhoneSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (mode === "signup" && !name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!/^1[3-9]\d{8}$/.test(phone)) {
      setMessage("Please enter a valid Bangladeshi mobile number.");
      return;
    }

    setStep("otp");
  };

  const handleOtpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    setMessage("Demo mode: Backend authentication is not connected yet.");
  };

  const changeMode = (next: AuthMode) => {
    setMode(next);
    setStep("phone");
    setOtp("");
    setMessage("");
  };

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 scale-105 bg-cover bg-center"
        style={{
          backgroundImage: "url('/log-in.avif')",
        }}
      />

      {/* Dark Green Overlay */}
      <div className="absolute inset-0 z-0 bg-[#102B19]/65" />

      {/* Decorative Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-green-950/50 via-transparent to-black/40" />

      {/* Floating Authentication Window */}
      <div className="relative z-10 w-full max-w-120">
        <div className="overflow-hidden rounded-[28px] border border-white/40 bg-white/95 shadow-[0_25px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          {/* Header */}

          <div className="px-6 pb-8 sm:px-10 sm:pb-10">
            {/* Login / Signup Toggle */}
            {step === "phone" && (
              <div className="mb-7 grid grid-cols-2 rounded-xl bg-green-50 p-1.5">
                <button
                  type="button"
                  onClick={() => changeMode("login")}
                  className={`rounded-lg py-3 text-sm font-bold transition-all duration-300 ${
                    mode === "login"
                      ? "bg-green-700 text-white shadow-md shadow-green-700/20"
                      : "text-gray-500 hover:text-green-700"
                  }`}
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => changeMode("signup")}
                  className={`rounded-lg py-3 text-sm font-bold transition-all duration-300 ${
                    mode === "signup"
                      ? "bg-green-700 text-white shadow-md shadow-green-700/20"
                      : "text-gray-500 hover:text-green-700"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Phone Form */}
            {step === "phone" && (
              <form onSubmit={handlePhoneSubmit} className="space-y-5">
                {mode === "signup" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mobile Number
                  </label>

                  <div className="flex overflow-hidden rounded-xl border border-gray-200 transition focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/10">
                    <div className="flex items-center gap-2 border-r border-gray-200 bg-gray-50 px-4 text-sm font-bold text-gray-700">
                      🇧🇩 +880
                    </div>

                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="1XXXXXXXXX"
                      className="min-w-0 flex-1 bg-white px-4 py-3.5 text-sm outline-none"
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Enter your 10-digit mobile number.
                  </p>
                </div>

                {message && (
                  <p role="alert" className="text-sm text-red-600">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-4 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl"
                >
                  Continue with Phone
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}

            {/* OTP Verification */}
            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Six-digit OTP
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="w-full rounded-xl border border-gray-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                  />
                </div>

                {message && (
                  <p role="status" className="text-sm text-amber-700">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-4 font-bold text-white transition hover:bg-green-800"
                >
                  Verify & Continue
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setMessage("");
                  }}
                  className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-green-700"
                >
                  <ArrowLeft size={16} />
                  Change Mobile Number
                </button>
              </form>
            )}

            {/* Google Login */}
            {step === "phone" && (
              <>
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Or continue with
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMessage(
                      "Google authentication will be integrated later.",
                    )
                  }
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-bold text-gray-700 transition hover:border-green-300 hover:bg-green-50"
                >
                  <svg viewBox="0 0 48 48" className="h-5 w-5">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.62 5.91c4.44-4.1 7.15-10.14 7.15-17.56Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.84 2.26-8.28 2.26-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {message && (
                  <p
                    role="status"
                    className="mt-3 text-center text-sm text-amber-700"
                  >
                    {message}
                  </p>
                )}
              </>
            )}

            {/* Terms */}
            <p className="mt-7 text-center text-xs leading-6 text-gray-400">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                className="font-semibold text-green-700 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="font-semibold text-green-700 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>

            <a
              href="/"
              className="mt-5 block text-center text-sm font-semibold text-gray-500 transition hover:text-green-700"
            >
              ← Back to Veg Market
            </a>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-white/85">
          <ShieldCheck size={17} className="text-lime-300" />
          Fresh products. Trusted shopping. Secure experience.
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
