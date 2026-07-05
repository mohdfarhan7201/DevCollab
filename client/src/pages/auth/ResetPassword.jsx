import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoLogoGithub } from "react-icons/io";

import { useResetPassword } from "../../hooks";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Must contain at least one number."),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const resetPassword = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    if (!token) return;

    try {
      await resetPassword.mutateAsync({
        token,
        password: values.password,
      });

      navigate("/login", {
        replace: true,
      });
    } catch {}
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <IoLogoGithub className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mt-2 text-center text-muted-foreground">
          Create a new secure password for your account.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              New Password
            </label>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 outline-none transition focus:border-primary"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 outline-none transition focus:border-primary"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {!token && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              Invalid or expired reset token.
            </p>
          )}

          <button
            type="submit"
            disabled={
              !token ||
              isSubmitting ||
              resetPassword.isPending
            }
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {resetPassword.isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-8 block text-center text-sm font-medium text-primary hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </section>
  );
}