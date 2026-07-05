import { Loader2, Github } from "lucide-react";

export default function AuthLoader({
  title = "Authenticating...",
  description = "Please wait while we prepare your workspace.",
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-border bg-card p-10 text-center shadow-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Github className="h-8 w-8" />
        </div>

        <Loader2 className="mt-8 h-12 w-12 animate-spin text-primary" />

        <h2 className="mt-6 text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}