import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoLogoGithub } from "react-icons/io";

import { useForgotPassword } from "../../hooks";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
});

export default function ForgotPassword() {
  const forgotPassword = useForgotPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      await forgotPassword.mutateAsync(values);

      reset();
    } catch {}
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <IoLogoGithub className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-2 text-center text-muted-foreground">
          Enter your email and we'll send you a password reset link.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              forgotPassword.isPending
            }
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {forgotPassword.isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <Link
          to="/login"
          className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </section>
  );
}