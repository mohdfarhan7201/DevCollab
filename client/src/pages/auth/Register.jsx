import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoLogoGithub } from "react-icons/io";

import { useRegister } from "../../hooks";
import { useAuth } from "../../context/AuthContext";

const schema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Enter a valid email."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export default function Register() {
  const navigate = useNavigate();

  const registerMutation = useRegister();
  const { updateUser } = useAuth();

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
    try {
      const data =
        await registerMutation.mutateAsync({
          name: values.name,
          email: values.email,
          password: values.password,
        });

      if (data.user) {
        updateUser(data.user);

        navigate("/dashboard", {
          replace: true,
        });

        return;
      }

      navigate("/verify-email", {
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
          Create Account
        </h1>

        <p className="mt-2 text-center text-muted-foreground">
          Join DevCollab and start collaborating.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
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

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
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
                  showConfirmPassword ? "text" : "password"
                }
                placeholder="••••••••"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 outline-none transition focus:border-primary"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
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

          <button
            type="submit"
            disabled={
              isSubmitting || registerMutation.isPending
            }
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}