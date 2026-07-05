import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Mail,
} from "lucide-react";
import { IoLogoGithub } from "react-icons/io";

import {
  useVerifyEmail,
  useResendVerification,
} from "../../hooks";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const verifyEmail = useVerifyEmail();
  const resendVerification =
    useResendVerification();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Verifying your email..."
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    verifyEmail
      .mutateAsync(token)
      .then((data) => {
        setStatus("success");
        setMessage(
          data.message ||
            "Your email has been verified successfully."
        );
      })
      .catch((error) => {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Email verification failed."
        );
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleResend = async () => {
    if (!email) return;

    try {
      await resendVerification.mutateAsync({
        email,
      });
    } catch {}
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <IoLogoGithub className="h-8 w-8" />
        </div>

        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mt-8 h-12 w-12 animate-spin text-primary" />

            <h1 className="mt-6 text-3xl font-bold">
              Verifying Email
            </h1>

            <p className="mt-3 text-muted-foreground">
              {message}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto mt-8 h-16 w-16 text-green-500" />

            <h1 className="mt-6 text-3xl font-bold">
              Email Verified
            </h1>

            <p className="mt-3 text-muted-foreground">
              {message}
            </p>

            <Link
              to="/login"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Continue to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto mt-8 h-16 w-16 text-red-500" />

            <h1 className="mt-6 text-3xl font-bold">
              Verification Failed
            </h1>

            <p className="mt-3 text-muted-foreground">
              {message}
            </p>

            {email && (
              <button
                onClick={handleResend}
                disabled={resendVerification.isPending}
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 font-semibold transition hover:bg-muted disabled:opacity-60"
              >
                {resendVerification.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    Resend Verification Email
                  </>
                )}
              </button>
            )}

            <Link
              to="/login"
              className="mt-5 block text-sm font-medium text-primary hover:underline"
            >
              Back to Login
            </Link>
          </>
        )}
      </div>
    </section>
  );
}